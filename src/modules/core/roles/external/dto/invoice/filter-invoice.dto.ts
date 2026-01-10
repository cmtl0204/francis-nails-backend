import { IsOptional, IsString, IsUUID, IsDate, IsNumber } from 'class-validator';
import { isStringValidationOptions, isDateValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterInvoiceDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4', { message: 'El cliente debe ser un UUID válido' })
  @IsOptional()
  readonly customerId?: string;

  @IsUUID('4', { message: 'La cita debe ser un UUID válido' })
  @IsOptional()
  readonly appointmentId?: string; 

  @IsNumber({}, isNumberValidationOptions())
  @IsOptional()
  readonly statusId?: number;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly invoiceNumber?: string;

  @IsDate(isDateValidationOptions())
  @Type(() => Date)
  @IsOptional()
  readonly startDate?: Date;

  @IsDate(isDateValidationOptions())
  @Type(() => Date)
  @IsOptional()
  readonly endDate?: Date;

  @Type(() => Boolean)
  @IsOptional()
  readonly enabled?: boolean;

  @Type(() => Number)
  @IsOptional()
  readonly minTotal?: number;

  @Type(() => Number)
  @IsOptional()
  readonly maxTotal?: number;
}