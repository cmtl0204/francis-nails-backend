import { IsOptional, IsString, IsUUID, IsBoolean } from 'class-validator';
import { isStringValidationOptions, isBooleanValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterProductDto {
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly search?: string;

  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4', { message: 'La categoría debe ser un UUID válido' })
  @IsOptional()
  readonly categoryId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly sku?: string;

  @Type(() => Boolean)
  @IsOptional()
  readonly trackStock?: boolean;

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