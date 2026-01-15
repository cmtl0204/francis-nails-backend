import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateProfileDto, UpdateUserDto } from '@auth/dto';
import { MAX_ATTEMPTS } from '@auth/constants';
import { UserEntity } from '@auth/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { AuthRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class UsersService {
  private paginateFilterService: PaginateFilterService<UserEntity>;

  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private repository: Repository<UserEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateUserDto): Promise<UserEntity> {
    const userExist = await this.repository.findOne({
      where: [{ identification: payload.email }, { username: payload.username }],
    });

    if (userExist) throw new BadRequestException('El usuario ya existe');

    const entity = this.repository.create(payload);

    return await this.repository.save(entity);
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.find();

    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['name', 'lastname', 'identification'],
      relations: ['roles'],
    });
  }

  async findOne(id: string): Promise<UserEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: {
        roles: true,
        identificationType: true,
      },
      select: { password: false },
    });

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado (find one)');
    }

    return entity;
  }

  async update(id: string, payload: UpdateUserDto): Promise<UserEntity> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado para actualizar');
    }

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async activate(id: string): Promise<UserEntity> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado para reactivar');
    }

    entity.suspendedAt = null;
    entity.maxAttempts = MAX_ATTEMPTS;

    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<UserEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado para eliminar');
    }

    return await this.repository.softRemove(entity);
  }

  async removeAll(payload: UserEntity[]): Promise<UserEntity[]> {
    return await this.repository.softRemove(payload);
  }

  async suspend(id: string): Promise<UserEntity> {
    const entity = await this.findOne(id);

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado para suspender');
    }

    entity.suspendedAt = new Date();

    return await this.repository.save(entity);
  }

  async findProfile(id: string): Promise<UserEntity> {
    const user = await this.repository.findOne({
      select: {
        id: true,
        avatar: true,
        birthdate: true,
        identification: true,
        name: true,
        email: true,
        emailVerifiedAt: true,
        lastname: true,
        personalEmail: true,
        username: true,
        cellPhone: true,
        phone: true,
      },
      where: {
        id,
      },
      relations: {
        roles: true,
        identificationType: true,
        bloodType: true,
        ethnicOrigin: true,
        gender: true,
        maritalStatus: true,
        nationality: true,
        sex: true,
      },
    });

    if (!user) {
      throw new NotFoundException('El perfil no existe');
    }

    return user;
  }

  async updateProfile(id: string, payload: UpdateProfileDto): Promise<UserEntity> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado para actualizar el perfil');
    }

    this.repository.merge(entity, payload);

    return await this.repository.save(entity);
  }

  async uploadAvatar(file: Express.Multer.File, id: string): Promise<UserEntity> {
    const entity = await this.repository.findOne({
      select: {
        id: true,
        avatar: true,
      },
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Usuario no encontrado');
    }

    entity.avatar = `avatars/${file.filename}`;

    return await this.repository.save(entity);
  }
}
