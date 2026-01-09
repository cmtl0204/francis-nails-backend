import { IsDate, IsNotEmpty, IsOptional, IsString, IsEmail } from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { ProcessEntity } from '@modules/core/entities';

export class BaseBranchDto {

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly phone: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly email: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly address: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly city: string;
}
