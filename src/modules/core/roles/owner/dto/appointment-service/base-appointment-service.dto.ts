import { IsDecimal, IsNotEmpty, IsNumber } from 'class-validator';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { AppointmentEntity, ServiceEntity } from '@modules/core/entities';

export class AppointmentServiceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly appointment: AppointmentEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly service: ServiceEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({}, isNumberValidationOptions())
  readonly durationMin: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsDecimal({},isNumberValidationOptions())
  readonly price: number;
}
