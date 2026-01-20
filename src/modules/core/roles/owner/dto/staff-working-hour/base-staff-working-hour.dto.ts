import { IsUUID, IsInt, IsBoolean, IsOptional, IsString,IsNotEmpty, IsPositive } from 'class-validator';
import { isStringValidationOptions,isNotEmptyValidationOptions, isPositiveValidationOptions } from '@utils/dto-validation';
import { StaffProfileEntity } from '@modules/core/entities';

export class BaseStaffWorkingHourDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @IsPositive(isPositiveValidationOptions())
  readonly weekday: number;

  @IsString(isStringValidationOptions())
  readonly startTime: string;

  @IsString(isStringValidationOptions())
  readonly endTime: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakStart: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakEnd: string;

  @IsBoolean()
  readonly isDayOff: boolean;
}
