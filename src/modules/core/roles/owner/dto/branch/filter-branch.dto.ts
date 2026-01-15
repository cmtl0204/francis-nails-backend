import { IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterBranchDto {
  @IsString()
  @IsOptional()
  readonly name?: string;

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
