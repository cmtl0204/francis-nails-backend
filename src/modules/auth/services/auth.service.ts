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
import { TransactionalCodeEntity, UserEntity } from '@auth/entities';
import { PayloadTokenInterface, RefreshTokenInterface } from 'src/modules/auth/interfaces';
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
import { ErrorCodeEnum } from '@auth/enums';

@Injectable()
export class AuthService {
  private readonly MAX_ATTEMPTS = 3;

  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
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

  async signUpExternal(payload: SignUpExternalDto): Promise<ServiceResponseHttpInterface> {
    const user = this.repository.create();

    user.identification = payload.identification;
    user.email = payload.email;
    user.username = payload.email;
    user.name = payload.name;
    user.password = payload.password;
    user.passwordChanged = true;

    const userCreated = await this.repository.save(user);

    return { data: userCreated };
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

  async refreshToken(user: UserEntity): Promise<RefreshTokenInterface> {
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
        error: ErrorCodeEnum.NOT_FOUND,
        message: 'Usuario no encontrado, intente de nuevo',
      });
    }
    const randomNumber = Math.random();
    const token = randomNumber.toString().substring(2, 8);

    const mailData: MailDataInterface = {
      to: user.email || user.personalEmail,
      subject: MailSubjectEnum.RESET_PASSWORD,
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
    const chars = 3; // Cantidad de caracters visibles

    const email = value.replace(
      /[a-z0-9\-_.]+@/gi,
      (c) =>
        c.substr(0, chars) +
        c
          .split('')
          .slice(chars, -1)
          .map((v) => '*')
          .join('') +
        '@',
    );

    return { data: email };
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
        error: ErrorCodeEnum.NOT_FOUND,
      });
    }

    if (transactionalCode.username !== username) {
      throw new BadRequestException({
        message: 'El usuario no corresponde al código transaccional generado',
        error: ErrorCodeEnum.TRANSACTIONAL_CODE_NOT_MATCH,
      });
    }

    if (transactionalCode.isUsed) {
      throw new BadRequestException({
        message: 'El código ya fue usado',
        error: ErrorCodeEnum.TRANSACTIONAL_CODE_USED,
      });
    }

    const maxDate = add(transactionalCode.createdAt, { minutes: 10 });

    if (isBefore(maxDate, new Date())) {
      throw new BadRequestException({
        message: 'El código ha expirado',
        error: ErrorCodeEnum.TRANSACTIONAL_CODE_EXPIRED,
      });
    }

    transactionalCode.isUsed = true;

    await this.transactionalCodeRepository.save(transactionalCode);

    return { data: true };
  }

  async resetPassword(payload: any): Promise<ServiceResponseHttpInterface> {
    const user = await this.repository.findOne({
      where: { username: payload.username },
    });

    if (!user) {
      throw new NotFoundException({
        message: 'Usuario no encontrado para resetear contraseña, intente de nuevo',
        error: ErrorCodeEnum.NOT_FOUND,
      });
    }

    // user.maxAttempts = this.MAX_ATTEMPTS;
    // user.password = payload.passwordNew;
    // user.passwordChanged = true;

    await this.repository.update(user.id, {
      maxAttempts: this.MAX_ATTEMPTS,
      password: Bcrypt.hashSync(payload.passwordNew, 10),
      passwordChanged: true,
    });

    return { data: true };
  }

  async verifyUserExist(identification: string, userId: string): Promise<UserEntity | null> {
    const where: any = { identification };

    if (userId) {
      where.id = Not(userId);
    }

    return this.repository.findOne({ where });
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
        suspendedAt: null,
      });
      return true;
    }

    if (!reduceAttempts) {
      return false;
    }

    const remainingAttempts = Math.max(user.maxAttempts - 1, 0);

    await this.repository.update(user.id, {
      maxAttempts: remainingAttempts,
      suspendedAt: remainingAttempts === 0 ? new Date() : user.suspendedAt,
    });

    return false;
  }
}
