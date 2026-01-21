import { IsNotEmpty, IsString, IsBoolean, IsDecimal, IsOptional,IsNumber, MaxLength } from 'class-validator';

import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
  isNumberValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class ProductDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly sku: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unit: string;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly costPrice: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly salePrice: number;

  @IsBoolean(isBooleanValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly trackStock: boolean;

  @IsBoolean(isBooleanValidationOptions())
  @IsOptional()
  readonly enabled: boolean;
}