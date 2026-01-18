import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as Bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Not, Repository } from 'typeorm';
import { add, isBefore } from 'date-fns';
import { RoleEntity, TransactionalCodeEntity, UserEntity } from '@auth/entities';
import { PayloadTokenInterface, TokenInterface } from 'src/modules/auth/interfaces';
import { AuthRepositoryEnum, MailSubjectEnum, MailTemplateEnum } from '@utils/enums';
import {
  PasswordChangeDto,
  SignInDto,
  SignUpExternalDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { MailService } from '@modules/common/mail/mail.service';
import { envConfig } from '@config';
import { ConfigType } from '@nestjs/config';
import { MailDataInterface } from '@modules/common/mail/interfaces/mail-data.interface';
import { UsersService } from './users.service';
import { lastValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import ms from 'ms';
import { SignInInterface } from '@auth/interfaces/sign-in.interface';
import { ErrorCodeEnum, MessageAuthEnum, RoleEnum } from '@auth/enums';
import { SECURITY_CODE_EXPIRES_IN } from '@auth/constants';

@Injectable()
export class AuthService {
  private readonly MAX_ATTEMPTS = 3;

  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
    @Inject(AuthRepositoryEnum.ROLE_REPOSITORY)
    private roleRepository: Repository<RoleEntity>,
    @Inject(AuthRepositoryEnum.TRANSACTIONAL_CODE_REPOSITORY)
    private transactionalCodeRepository: Repository<TransactionalCodeEntity>,
    @Inject(envConfig.KEY) private configService: ConfigType<typeof envConfig>,
    private readonly userService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailService,
    private readonly httpService: HttpService,
  ) {}

  async changePassword(
    id: string,
    payload: PasswordChangeDto,
  ): Promise<ServiceResponseHttpInterface> {
    const user = await this.repository.findOne({
      select: {
        id: true,
        identification: true,
        lastname: true,
        name: true,
        maxAttempts: true,
        password: true,
        suspendedAt: true,
        username: true,
      },
      where: { id },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado para cambio de contraseña');
    }

    const isMatchPassword = await this.checkPassword(payload.passwordOld, user, false);

    if (!isMatchPassword) {
      throw new BadRequestException('La contraseña anterior no coincide.');
    }

    if (payload.passwordConfirmation !== payload.passwordNew) {
      throw new BadRequestException('Las contraseñas no coinciden.');
    }

    await this.repository.update(user.id, {
      password: Bcrypt.hashSync(payload.passwordNew, 10),
    });

    return { data: true };
  }

  async signIn(payload: SignInDto): Promise<SignInInterface> {
    const user: UserEntity | null = await this.repository.findOne({
      select: {
        id: true,
        identification: true,
        lastname: true,
        name: true,
        maxAttempts: true,
        password: true,
        suspendedAt: true,
        username: true,
      },
      where: {
        username: payload.username,
      },
      relations: {
        roles: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException({
        error: ErrorCodeEnum.INVALID_USER,
        message: 'Usuario y/o contraseña no válidos',
      });
    }

    if (user?.suspendedAt)
      throw new ForbiddenException({
        error: ErrorCodeEnum.ACCOUNT_SUSPENDED,
        message: 'Su usuario se encuentra suspendido',
      });

    if (user?.maxAttempts === 0) {
      throw new ForbiddenException({
        error: ErrorCodeEnum.ACCOUNT_LOCKED,
        message: 'Ha excedido el número máximo de intentos permitidos',
      });
    }

    if (!(await this.checkPassword(payload.password, user))) {
      throw new UnauthorizedException({
        error: ErrorCodeEnum.INVALID_PASSWORD,
        message: `Usuario y/o contraseña no válidos, ${user.maxAttempts - 1} intentos restantes`,
      });
    }

    const { password, suspendedAt, maxAttempts, ...userRest } = user;

    const tokens = this.generateJwt(user);

    await this.repository.update(user.id, {
      activatedAt: new Date(),
      refreshToken: await Bcrypt.hash(tokens.refreshToken, 10),
    });

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      auth: userRest,
      roles: userRest.roles,
    };
  }

  async signInLDAP(payload: SignInDto): Promise<boolean> {
    const url = `${this.configService.urlLDAP}/${payload.username.split('@')[0]}/${payload.password}`;

    const response = await lastValueFrom(this.httpService.get(url));

    return response.data.data;
  }

  async signUpExternal(payload: SignUpExternalDto): Promise<UserEntity> {
    const role = await this.roleRepository.findOneBy({ code: RoleEnum.CUSTOMER });

    const entity = this.repository.create({
      ...payload,
      passwordChanged: true,
      emailVerifiedAt: new Date(),
      termsAcceptedAt: new Date(),
    });

    entity.roles = [role!];

    return await this.repository.save(entity);
  }

  async findUserInformation(id: string): Promise<ServiceResponseHttpInterface> {
    const user = await this.repository.findOneBy({ id });

    if (!user) {
      throw new NotFoundException('Información de usuario no existe');
    }

    return { data: user };
  }

  async updateUserInformation(
    id: string,
    payload: UpdateUserInformationDto,
  ): Promise<ServiceResponseHttpInterface> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFoundException('Usuario no encontrado para actualizar información');
    }

    this.repository.merge(user, payload);

    const userUpdated = await this.repository.save(user);

    return { data: userUpdated };
  }

  async refreshToken(user: UserEntity): Promise<TokenInterface> {
    const tokens = this.generateJwt(user);

    await this.saveRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async saveRefreshToken(userId: string, refreshToken: string) {
    await this.repository.update(userId, {
      refreshToken: await Bcrypt.hash(refreshToken, 10),
    });
  }

  async requestTransactionalCode(username: string): Promise<ServiceResponseHttpInterface> {
    const user = await this.repository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException({
        error: MessageAuthEnum.NOT_FOUND,
        message: 'Usuario no encontrado, intente de nuevo',
      });
    }

    const randomNumber = Math.random();
    const token = randomNumber.toString().substring(2, 8);

    const mailData: MailDataInterface = {
      to: user.email || user.personalEmail,
      subject: MailSubjectEnum.TRANSACTIONAL_CODE,
      template: MailTemplateEnum.TRANSACTIONAL_CODE,
      data: {
        token,
        user,
      },
    };

    await this.mailService.sendMail(mailData);

    const payload = { username: user.username, token, type: 'password_reset' };

    await this.transactionalCodeRepository.save(payload);

    const value = user.email || user.personalEmail;

    const email = this.maskEmail(value);

    return { data: email };
  }

  async requestTransactionalPasswordResetCode(identification: string): Promise<string> {
    const user = await this.repository.findOneBy({ identification });

    if (!user) {
      throw new NotFoundException();
    }

    const randomNumber = Math.random();
    const token = randomNumber.toString().substring(2, 8);

    const mailData: MailDataInterface = {
      to: user.email,
      subject: MailSubjectEnum.PASSWORD_RESET,
      template: MailTemplateEnum.TRANSACTIONAL_PASSWORD_RESET_CODE,
      data: {
        token,
        user,
        expiresIn: SECURITY_CODE_EXPIRES_IN,
      },
    };

    await this.mailService.sendMail(mailData);

    const payload = { username: user.identification, token, type: 'password_reset' };

    await this.transactionalCodeRepository.save(payload);

    return user.email;
  }

  async requestTransactionalSignupCode(email: string): Promise<string> {
    const randomNumber = Math.random();

    const token = randomNumber.toString().substring(2, 8);

    const mailData: MailDataInterface = {
      to: email,
      subject: MailSubjectEnum.ACCOUNT_REGISTER,
      template: MailTemplateEnum.TRANSACTIONAL_SIGNUP_CODE,
      data: { token },
    };

    await this.mailService.sendMail(mailData);

    const entity = this.transactionalCodeRepository.create({
      username: email,
      token,
      type: 'signup',
    });

    await this.transactionalCodeRepository.save(entity);

    return email;
  }

  async verifyTransactionalCode(
    token: string,
    username: string,
  ): Promise<ServiceResponseHttpInterface> {
    const transactionalCode = await this.transactionalCodeRepository.findOne({
      where: { token },
    });

    if (!transactionalCode) {
      throw new BadRequestException({
        message: 'Código Transaccional no válido',
        error: MessageAuthEnum.TRANSACTIONAL_CODE_INVALID,
      });
    }

    if (transactionalCode.username.toLowerCase() !== username.toLowerCase()) {
      throw new BadRequestException({
        message: 'El usuario no corresponde al código transaccional generado',
        error: MessageAuthEnum.TRANSACTIONAL_CODE_NOT_MATCH,
      });
    }

    if (transactionalCode.isUsed) {
      throw new BadRequestException({
        message: 'El código ya fue usado',
        error: MessageAuthEnum.TRANSACTIONAL_CODE_USED,
      });
    }

    const maxDate = add(transactionalCode.createdAt, { minutes: SECURITY_CODE_EXPIRES_IN });

    if (isBefore(maxDate, new Date())) {
      throw new BadRequestException({
        message: 'El código ha expirado',
        error: MessageAuthEnum.TRANSACTIONAL_CODE_EXPIRED,
      });
    }

    transactionalCode.isUsed = true;

    await this.transactionalCodeRepository.save(transactionalCode);

    return { data: true };
  }

  async resetPassword(username: string, password: string): Promise<boolean> {
    const user = await this.repository.findOne({
      where: { username },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Usuario no encontrado para resetear contraseña, intente de nuevo',
        error: MessageAuthEnum.NOT_FOUND,
      });
    }

    // user.maxAttempts = this.MAX_ATTEMPTS;
    // user.password = payload.passwordNew;
    // user.passwordChanged = true;

    await this.repository.update(user.id, {
      maxAttempts: this.MAX_ATTEMPTS,
      password: Bcrypt.hashSync(password, 10),
      passwordChanged: true,
    });

    return true;
  }

  async verifyExistUser(identification: string): Promise<UserEntity | null> {
    return await this.repository.findOne({
      where: { identification },
      select: { id: true },
    });
  }

  async verifyUpdatedUser(identification: string, userId: string): Promise<UserEntity | null> {
    return await this.repository.findOne({
      where: { identification, id: Not(userId) },
      select: { id: true },
    });
  }

  async verifyRegisteredUser(identification: string): Promise<ServiceResponseHttpInterface> {
    const user = await this.repository.findOne({
      where: { identification },
      select: { id: true, name: true, lastname: true, email: true },
    });

    if (!user) {
      throw new NotFoundException('Registro no encontrado');
    }

    return {
      data: {
        ...user,
        email: user.email ? this.maskEmail(user.email) : '',
      },
    };
  }

  async signOut(id: string): Promise<boolean> {
    await this.repository.update(id, {
      refreshToken: null,
    });

    return true;
  }

  private generateJwt(user: UserEntity) {
    const payload: PayloadTokenInterface = {
      sub: user.id,
      username: user.username,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.jwtRefreshSecret,
      expiresIn: ms(this.configService.jwtRefreshExpires ?? '7d'),
    });

    return { accessToken, refreshToken };
  }

  private async findByUsername(username: string): Promise<UserEntity> {
    return (await this.repository.findOne({
      where: {
        username,
      },
    })) as UserEntity;
  }

  private async checkPassword(
    passwordCompare: string,
    user: UserEntity,
    reduceAttempts = true,
  ): Promise<boolean> {
    const isMatch = await Bcrypt.compare(passwordCompare, user.password);

    if (isMatch) {
      await this.repository.update(user.id, {
        maxAttempts: this.MAX_ATTEMPTS,
      });
      return true;
    }

    if (!reduceAttempts) {
      return false;
    }

    const remainingAttempts = Math.max(user.maxAttempts - 1, 0);

    await this.repository.update(user.id, {
      maxAttempts: remainingAttempts,
    });

    return false;
  }

  private maskEmail(email: string): string {
    if (!email || !email.includes('@')) return email;

    const [user, domain] = email.split('@');

    if (user.length <= 3) {
      return `${user[0]}**@${domain}`;
    }

    const visible = user.slice(0, 3);
    const hidden = '*'.repeat(user.length - 3);

    return `${visible}${hidden}@${domain}`;
  }
}
