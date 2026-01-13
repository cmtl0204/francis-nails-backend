import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { AuthRepositoryEnum } from '@utils/enums';

@Injectable()
export class SuspendedUserGuard implements CanActivate {
  constructor(
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const user = req.user as UserEntity;

    if (!user) {
      return true;
    }

    const exists = await this.userRepo.findOne({
      where: { id: user.id },
      select: { id: true, suspendedAt: true },
    });

    if (!exists) {
      throw new ForbiddenException({
        error: 'Usuario no válido',
        message: 'La sesión ya no es válida',
      });
    }

    if (exists.suspendedAt) {
      throw new ForbiddenException({
        error: 'Cuenta suspendida',
        message: 'La cuenta del usuario está suspendida',
      });
    }

    return true;
  }
}
