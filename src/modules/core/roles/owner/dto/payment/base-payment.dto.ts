import { IsNotEmpty, IsString, IsUUID, IsDecimal, IsDate, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class PaymentDto {
  @IsUUID('4', { message: 'La factura debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceId: string;

  @IsUUID('4', { message: 'El método de pago debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly methodId: string;

  @IsDecimal({}, { message: 'El monto debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly amount: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly paidAt: Date;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reference?: string;
}