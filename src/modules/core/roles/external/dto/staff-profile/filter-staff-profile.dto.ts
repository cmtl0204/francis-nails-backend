import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStaffProfileDto {
  @IsUUID('4')
  @IsOptional()
  readonly userId?: string;

  @IsUUID('4')
  @IsOptional()
  readonly positionId?: string;

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
