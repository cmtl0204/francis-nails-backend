import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PublicRoute, User } from '@auth/decorators';
import { UserEntity } from '@auth/entities';
import {
  PasswordChangeDto,
  SignInDto,
  SignUpExternalDto,
  UpdateUserInformationDto,
} from '@auth/dto';
import { ResponseHttpInterface } from '@utils/interfaces';
import { AuthService } from '@auth/services/auth.service';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'SignIn' })
  @PublicRoute()
  @Post('sign-in')
  async signIn(@Body() payload: SignInDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.signIn(payload);

    return {
      data: serviceResponse,
      message: 'Acceso Correcto',
      title: 'Bienvenido/a',
    };
  }

  @Post('sign-out')
  async signOut(@User() user: UserEntity) {
    const serviceResponse = await this.authService.signOut(user.id);

    return {
      data: serviceResponse,
      message: 'Sesión cerrada correctamente',
      title: 'Cerrar Sesión',
    };
  }

  @PublicRoute()
  @UseGuards(AuthGuard('jwt-refresh'))
  @Post('refresh-token')
  async refreshToken(@User() user: UserEntity): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.refreshToken(user);

    return {
      data: serviceResponse,
      message: 'Refresh Token',
      title: 'Refresh Token',
    };
  }

  @ApiOperation({ summary: 'SignUpExternal' })
  @PublicRoute()
  @Post('sign-up-external')
  async signUpExternal(@Body() payload: SignUpExternalDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.signUpExternal(payload);

    return {
      data: serviceResponse.data,
      message: 'Por favor inicie sesión',
      title: 'Usuario creado correctamente',
    };
  }

  @ApiOperation({ summary: 'Change Password' })
  @Put(':id/change-password')
  async changePassword(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: PasswordChangeDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.changePassword(id, payload);

    return {
      data: serviceResponse.data,
      message: 'La contraseña fue cambiada',
      title: 'Contraseña Actualizada',
    };
  }

  @ApiOperation({ summary: 'Find User Information' })
  @Get('user-information')
  async findUserInformation(@User() user: UserEntity): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.findUserInformation(user.id);

    return {
      data: serviceResponse.data,
      message: 'La información del usuario fue actualizada',
      title: 'Atualizado',
    };
  }

  @ApiOperation({ summary: 'Update User Information' })
  @Put('user-information')
  async updateUserInformation(
    @User('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateUserInformationDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.updateUserInformation(id, payload);

    return {
      data: serviceResponse,
      message: 'La inforación del usuario fue actualizada',
      title: 'Actualuizado',
    };
  }

  @PublicRoute()
  @Get('transactional-codes/:username/request')
  async requestTransactionalCode(
    @Param('username') username: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.requestTransactionalCode(username);

    return {
      data: serviceResponse.data,
      message: `Su código fue enviado a ${JSON.stringify(serviceResponse.data)}`,
      title: 'Código Enviado',
    };
  }

  @PublicRoute()
  @Patch('transactional-codes/:token/verify')
  async verifyTransactionalCode(
    @Param('token') token: string,
    @Body('username') username: string,
  ): Promise<ResponseHttpInterface> {
    await this.authService.verifyTransactionalCode(token, username);

    return {
      data: null,
      message: `Por favor ingrese su nueva contraseña`,
      title: 'Código Válido',
    };
  }

  @PublicRoute()
  @Patch('reset-passwords')
  async resetPassword(@Body() payload: any): Promise<ResponseHttpInterface> {
    await this.authService.resetPassword(payload);

    return {
      data: null,
      message: `Por favor inicie sesión`,
      title: 'Contraseña Reseteada',
    };
  }

  @PublicRoute()
  @Get('verify-user-exist/:identification')
  async verifyUserExist(
    @Param('identification') identification: string,
    @Query('userId') userId: string,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.authService.verifyUserExist(identification, userId);

    return {
      data: serviceResponse,
      message: `Existe Identificacion`,
      title: 'Existe',
    };
  }
}
