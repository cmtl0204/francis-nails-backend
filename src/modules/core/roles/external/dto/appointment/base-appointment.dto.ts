import { IsBoolean, IsDateString, IsInt, IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseAppointmentDto {
  @IsUUID('4')
  readonly branchId: string;

  @IsUUID('4')
  readonly customerId: string;

  @IsUUID('4')
  @IsOptional()
  readonly staffProfileId?: string;

  @IsInt()
  readonly statusId: number;

  @IsInt()
  readonly sourceId: number;

  @IsDateString()
  readonly startAt: Date;

  @IsDateString()
  readonly endAt: Date;

  @IsString()
  @IsOptional()
  readonly notes?: string;

  @IsBoolean()
  @IsOptional()
  readonly enabled?: boolean;
}
