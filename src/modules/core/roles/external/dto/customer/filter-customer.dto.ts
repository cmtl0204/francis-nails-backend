import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterCustomerDto {
  @IsUUID('4', { message: 'El usuario debe ser un UUID válido' })
  @IsOptional()
  readonly userId?: string;

  @IsUUID('4', { message: 'La referencia debe ser un UUID válido' })
  @IsOptional()
  readonly referralId?: string;

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
