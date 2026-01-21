import { IsNotEmpty, IsString, IsBoolean, IsDecimal, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { ProductEntity } from '@modules/core/entities';

export class ProductDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: ProductEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly categoryId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly sku: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unit: string;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly costPrice: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly salePrice: number;

  @IsBoolean(isBooleanValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly trackStock: boolean;

  @IsBoolean(isBooleanValidationOptions())
  @IsOptional()
  readonly enabled?: boolean;
}