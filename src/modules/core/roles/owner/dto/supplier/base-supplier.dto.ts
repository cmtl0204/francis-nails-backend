import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';

export class SupplierDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly phone: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly email: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly address: string;
}