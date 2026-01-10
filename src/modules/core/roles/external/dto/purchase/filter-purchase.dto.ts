import { IsOptional, IsString, IsUUID, IsDate } from 'class-validator';
import { isStringValidationOptions, isDateValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterPurchaseDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4', { message: 'El proveedor debe ser un UUID válido' })
  @IsOptional()
  readonly supplierId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly documentNumber?: string;

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
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}