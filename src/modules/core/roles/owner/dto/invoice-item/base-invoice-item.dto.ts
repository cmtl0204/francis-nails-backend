import { IsNotEmpty, IsString, IsDecimal, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { InvoiceEntity } from '@modules/core/entities';

export class InvoiceItemDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoice: InvoiceEntity;
  
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @IsOptional()
  readonly modelId?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly description: string;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unitPrice: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}