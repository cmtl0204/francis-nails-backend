import { IsNotEmpty, IsString, IsDecimal, IsOptional} from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';

export class InventoryMovementDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly locationId: string;

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

  @IsDecimal({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}