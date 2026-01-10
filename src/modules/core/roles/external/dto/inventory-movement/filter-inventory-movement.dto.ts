import { IsOptional, IsString, IsUUID } from 'class-validator';
import { isStringValidationOptions } from '@utils/dto-validation';
import { Type } from 'class-transformer';

export class FilterInventoryMovementDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsOptional()
  readonly productId?: string;

  @IsUUID('4', { message: 'La ubicación debe ser un UUID válido' })
  @IsOptional()
  readonly locationId?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly modelType?: string;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly type?: string;

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