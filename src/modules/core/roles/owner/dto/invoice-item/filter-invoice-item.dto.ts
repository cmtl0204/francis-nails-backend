import { IsOptional, IsString, IsUUID } from 'class-validator';
import { isStringValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterInvoiceItemDto {
  @IsUUID('4', { message: 'La factura debe ser un UUID válido' })
  @IsOptional()
  readonly invoiceId?: string;

  @IsUUID('4', { message: 'El técnico debe ser un UUID válido' })
  @IsOptional()
  readonly staffId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly modelType?: string;

  @Type(() => Boolean)
  @IsOptional()
  readonly enabled?: boolean;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}