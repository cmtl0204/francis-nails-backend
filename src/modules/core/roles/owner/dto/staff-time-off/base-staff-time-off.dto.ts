import { IsNotEmpty, IsString, IsDate, IsOptional } from 'class-validator';
import {
  isStringValidationOptions,
  isDateValidationOptions,
  isNotEmptyValidationOptions,
} from '@utils/dto-validation';
import { StaffProfileEntity } from '@modules/core/entities';

export class BaseStaffTimeOffDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsString(isStringValidationOptions())
  readonly reason: string;

}
