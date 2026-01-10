import { IsOptional, IsString, IsUUID } from 'class-validator';
import { isStringValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterSupplierDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsOptional()
  readonly branchId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly search?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification?: string;

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