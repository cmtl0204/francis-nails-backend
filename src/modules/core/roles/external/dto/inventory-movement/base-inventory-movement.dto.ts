import { IsNotEmpty, IsOptional, IsString, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';

export class BaseInventoryMovementDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branchId: string;

  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly productId: string;

  @IsUUID('4', { message: 'La ubicación debe ser un UUID válido' })
  @IsOptional()
  readonly locationId?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string; // invoices, appointments, purchases...

  @IsUUID('4', { message: 'El modelo debe ser un UUID válido' })
  @IsOptional()
  readonly modelId?: string;

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly type: string; // in|out|adjust

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reason?: string; // purchase, sale, service_use, shrinkage, adjustment

  @IsDecimal({}, { message: 'La cantidad debe ser un número decimal válido' })
  readonly quantity: number;
}