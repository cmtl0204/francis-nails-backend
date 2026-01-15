import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterServiceDto {
  @IsUUID('4')
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4')
  @IsOptional()
  readonly categoryId?: string;

  @Type(() => Boolean)
  @IsOptional()
  readonly enabled?: boolean;

  @Type(() => Boolean)
  @IsOptional()
  readonly isEnabled?: boolean;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}
