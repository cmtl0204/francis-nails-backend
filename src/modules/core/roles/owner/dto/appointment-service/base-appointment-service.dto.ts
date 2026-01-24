import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { AppointmentEntity, ServiceEntity } from '@modules/core/entities';

export class AppointmentServiceDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la cita asociada',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly appointment: AppointmentEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del servicio asociado a la cita',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly service: ServiceEntity;

  @ApiProperty({
    example: 60,
    description: 'Duración del servicio en minutos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly durationMin: number;

  @ApiProperty({
    example: 150.5,
    description: 'Precio del servicio',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly price: number;
}
