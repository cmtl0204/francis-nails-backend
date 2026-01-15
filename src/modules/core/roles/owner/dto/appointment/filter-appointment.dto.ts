import { IsOptional, IsUUID, IsInt, } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterAppointmentDto {
  @IsUUID('4')
  @IsOptional()
  readonly branchId?: string;

  @IsUUID('4')
  @IsOptional()
  readonly customerId?: string;

  @IsUUID('4')
  @IsOptional()
  readonly staffProfileId?: string;

  @IsInt()
  @IsOptional()
  readonly statusId?: number;

  @IsInt()
  @IsOptional()
  readonly sourceId?: number;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}
