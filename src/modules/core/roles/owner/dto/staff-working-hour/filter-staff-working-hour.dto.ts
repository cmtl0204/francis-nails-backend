import { IsOptional, IsUUID, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStaffWorkingHourDto {
  @IsUUID('4')
  @IsOptional()
  readonly staffProfileId?: string;

  @IsInt()
  @Min(1)
  @Max(7)
  @IsOptional()
  readonly weekday?: number;

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
