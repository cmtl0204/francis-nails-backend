import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class InventoryMovementDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly location: CatalogueEntity;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @IsOptional()
  @MaxLength(20, maxLengthValidationOptions())
  readonly modelId: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly type: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly reason: string;

  @IsNumber({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}