import { IsNotEmpty, IsNumber, IsDecimal, IsUUID } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';

export class AppointmentServiceDto {
  @IsUUID('4', { message: 'La cita debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly appointmentId: string;

  @IsUUID('4', { message: 'El servicio debe ser un UUID válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly serviceId: string;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly durationMin: number;

  @IsDecimal({}, { message: 'El precio debe ser un número decimal válido' })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly price: number;
}