import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseServiceDto {
  @IsUUID('4', { message: 'La sucursal debe ser un UUID válido' })
  readonly branchId: string;

  @IsUUID('4', { message: 'La categoría debe ser un UUID válido' })
  readonly categoryId: string;

  @IsString()
  readonly name: string;

  @IsString()
  @IsOptional()
  readonly description?: string;

  @IsInt()
  readonly durationMin: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  readonly basePrice: number;

  @IsBoolean()
  @IsOptional()
  readonly isEnabled?: boolean;

  @IsOptional()
  readonly enabled?: boolean;
}
