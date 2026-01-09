import { IsDate, IsNotEmpty, IsOptional, IsString, IsEmail, Length } from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { ProcessEntity } from '@modules/core/entities';

export class BaseCustomerDto {

@IsNotEmpty(isNotEmptyValidationOptions())
@IsString(isStringValidationOptions())
// longitud de texto
@Length(10, 13, { message: 'El RUC/Cédula debe tener entre 10 y 13 caracteres' })
readonly taxIdentification: string;

@IsNotEmpty(isNotEmptyValidationOptions())
@IsString(isStringValidationOptions())
readonly taxName: string;

@IsOptional()
@IsString(isStringValidationOptions())
readonly allergies: string;
}
