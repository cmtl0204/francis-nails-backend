import { IsNotEmpty, IsOptional, IsString, IsEmail, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isEmailValidationOptions,
} from '@utils/dto-validation';

export class BaseSupplierDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly phone?: string;

  @IsEmail({}, isEmailValidationOptions())
  @IsOptional()
  readonly email?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly address?: string;
}