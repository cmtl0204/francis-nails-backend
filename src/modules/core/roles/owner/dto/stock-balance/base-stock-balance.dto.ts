import { IsNotEmpty, IsDecimal, IsNumber } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class StockBalanceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly location: CatalogueEntity;

  @IsNumber({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}