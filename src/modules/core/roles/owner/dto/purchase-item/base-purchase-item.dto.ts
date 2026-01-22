import { IsNotEmpty, IsDecimal, IsNumber } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { ProductEntity, PurchaseEntity } from '@modules/core/entities';

export class PurchaseItemDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchase: PurchaseEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unitCost: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}