import { IsNotEmpty, IsString, IsNumber, IsOptional} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
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

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @IsOptional()
  readonly modelId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly type: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reason?: string;

  @IsNumber({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}