import { IsNotEmpty, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
} from '@utils/dto-validation';

export class BaseStockBalanceDto {
  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly productId: string;

  @IsUUID('4', { message: 'La ubicación debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly locationId: string;

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  readonly quantity: number;
}