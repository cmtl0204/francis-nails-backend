import { IsBoolean, IsInt, IsOptional, IsString, IsUUID, Min, Max } from 'class-validator';

export class BaseStaffWorkingHourDto {
  @IsUUID('4', { message: 'El staffProfileId debe ser un UUID válido' })
  readonly staffProfileId: string;

  @IsInt()
  @Min(1)
  @Max(7)
  readonly weekday: number;

  @IsString()
  readonly startTime: string;

  @IsString()
  readonly endTime: string;

  @IsString()
  @IsOptional()
  readonly breakStart?: string;

  @IsString()
  @IsOptional()
  readonly breakEnd?: string;

  @IsBoolean()
  @IsOptional()
  readonly isDayOff?: boolean;

  @IsOptional()
  readonly enabled?: boolean;
}
