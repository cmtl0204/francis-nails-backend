import { IsNotEmpty, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
} from '@utils/dto-validation';

export class BasePurchaseItemDto {
  @IsUUID('4', { message: 'La compra debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchaseId: string;

  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly productId: string;

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  readonly quantity: number;

  @IsDecimal({}, { message: 'El costo unitario debe ser un número decimal válido' })
  readonly unitCost: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  readonly total: number;
}