import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { UserEntity } from '@auth/entities';
import { AuthRepositoryEnum } from '@utils/enums';
import { IS_PUBLIC_ROUTE_KEY } from '@auth/constants';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AccountGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    @Inject(AuthRepositoryEnum.USER_REPOSITORY)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_ROUTE_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const req = context.switchToHttp().getRequest<Request>();

    const user = req.user as UserEntity | undefined;

    // Si no hay usuario en la request, no aplica este guard
    if (!user) return true;

    const exists = await this.userRepository.findOne({
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
        error: 'Cuenta Suspendida',
        message: 'La cuenta del usuario está suspendida',
      });
    }

    if (user.maxAttempts === 0)
      throw new UnauthorizedException({
        error: 'Cuenta Bloqueada',
        message: "'Ha excedido el número máximo de intentos permitidos'",
      });

    return true;
  }
}
