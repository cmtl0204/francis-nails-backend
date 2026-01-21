import { IsNotEmpty, IsString, IsBoolean, IsDecimal, IsOptional,IsNumber } from 'class-validator';

import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class ProductDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

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
  readonly enabled?: boolean;
}