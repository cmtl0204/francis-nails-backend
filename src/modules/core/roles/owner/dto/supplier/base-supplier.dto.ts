import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';

export class SupplierDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly phone?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly email?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly address?: string;
}