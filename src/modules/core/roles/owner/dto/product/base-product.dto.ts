import { IsNotEmpty, IsOptional, IsString, IsDecimal, IsBoolean, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
} from '@utils/dto-validation';

export class BaseProductDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'La categoría debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly categoryId: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly sku: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly unit?: string; // unidad, ml, g...

  @IsDecimal({}, { message: 'El precio de costo debe ser un número decimal válido' })
  readonly costPrice: number;

  @IsDecimal({}, { message: 'El precio de venta debe ser un número decimal válido' })
  readonly salePrice: number;

  @IsBoolean(isBooleanValidationOptions())
  readonly trackStock: boolean;
}