import { IsNotEmpty, IsOptional, IsString, IsDate, IsDecimal, IsUUID, IsNumber } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isDateValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class BaseInvoiceDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El cliente debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customerId: string;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly statusId: number; // 1=draft,2=issued,3=void

  @IsUUID('4', { message: 'El usuario creador debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly createdBy: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceNumber: string; // serie + secuencial

  @IsDate(isDateValidationOptions())
  @Type(() => Date)
  readonly issuedAt: Date;

  @IsDecimal({}, { message: 'El subtotal debe ser un número decimal válido' })
  readonly subtotal: number;

  @IsDecimal({}, { message: 'El descuento debe ser un número decimal válido' })
  readonly discount: number;

  @IsDecimal({}, { message: 'El IVA debe ser un número decimal válido' })
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  readonly total: number;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly notes?: string;
}