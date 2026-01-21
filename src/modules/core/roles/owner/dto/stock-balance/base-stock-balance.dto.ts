import { IsNotEmpty, IsDecimal } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { ProductEntity } from '@modules/core/entities';

export class StockBalanceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly locationId: string;

  @IsDecimal({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}