import { PickType } from '@nestjs/swagger';
import { AppointmentDto } from './base-appointment.dto';
import { IsOptional, IsDate, IsString, IsBoolean, IsUUID } from 'class-validator';
import { isBooleanValidationOptions, isDateValidationOptions, isStringValidationOptions } from '@utils/dto-validation';

export class UpdateAppointmentDto extends PickType(AppointmentDto, [
  'branchId',
  'customerId',
  'staffProfileId',
  'statusId',
  'sourceId',
  'startAt',
  'endAt',
  'notes',
  'enabled',
]) {
  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly notes: string;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly enabled: boolean;
}
