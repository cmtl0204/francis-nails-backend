import { IsNotEmpty, IsString, IsDecimal, IsDate, MaxLength } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { BranchEntity, SupplierEntity } from '@modules/core/entities';

export class PurchaseDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly supplier: SupplierEntity;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly documentNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchasedAt: Date;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}