import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterPurchaseItemDto {
  @IsUUID('4', { message: 'La compra debe ser un UUID válido' })
  @IsOptional()
  readonly purchaseId?: string;

  @IsUUID('4', { message: 'El producto debe ser un UUID válido' })
  @IsOptional()
  readonly productId?: string;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}