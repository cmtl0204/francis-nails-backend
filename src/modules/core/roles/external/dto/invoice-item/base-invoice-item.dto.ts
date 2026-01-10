import { IsNotEmpty, IsOptional, IsString, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class BaseInvoiceItemDto {
  @IsUUID('4', { message: 'La factura debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceId: string;

  @IsUUID('4', { message: 'El técnico debe ser un UUID válido' })
  @IsOptional()
  readonly staffId?: string; // quien realizó ESTE servicio

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string; // service|product|other

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  @IsOptional()
  readonly modelId?: string; // ref: > services.id, null

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly description: string;

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  readonly quantity: number;

  @IsDecimal({}, { message: 'El precio unitario debe ser un número decimal válido' })
  readonly unitPrice: number;

  @IsDecimal({}, { message: 'El descuento debe ser un número decimal válido' })
  readonly discount: number;

  @IsDecimal({}, { message: 'El IVA debe ser un número decimal válido' })
  readonly tax: number;

  @IsDecimal({}, { message: 'El total debe ser un número decimal válido' })
  readonly total: number;
}