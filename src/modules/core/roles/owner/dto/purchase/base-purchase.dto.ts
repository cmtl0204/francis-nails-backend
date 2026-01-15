import { IsNotEmpty, IsOptional, IsString, IsDate, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isDateValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class BasePurchaseDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El proveedor debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly supplierId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly documentNumber: string;

  @IsDate(isDateValidationOptions())
  @Type(() => Date)
  readonly purchasedAt: Date;

  @IsDecimal({}, { message: 'El subtotal debe ser un número decimal válido' })
  readonly subtotal: number;

  @IsDecimal({}, { message: 'El IVA debe ser un número decimal válido' })
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  readonly total: number;
}