import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStockBalanceDto {
  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsOptional()
  readonly productId?: string;

  @IsUUID('4', { message: 'La ubicación debe ser un UUID válido' })
  @IsOptional()
  readonly locationId?: string;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}