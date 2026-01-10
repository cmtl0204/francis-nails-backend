import { IsDate, IsNotEmpty, IsOptional, IsString, IsEmail, IsBoolean } from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { ProcessEntity } from '@modules/core/entities';

export class BaseBranchDto {
  @IsString()
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString()
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly phone: string;

  @IsEmail({}, { message: 'El email debe ser válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly email: string;

  @IsString()
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly address: string;

  @IsString()
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly city: string;

  @IsBoolean()
  readonly enabled?: boolean;
}
