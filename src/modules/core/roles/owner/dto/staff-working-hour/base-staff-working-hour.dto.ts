import { IsBoolean, IsOptional, IsString, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isStringValidationOptions,
  isNotEmptyValidationOptions,
  isPositiveValidationOptions,
} from '@utils/dto-validation';
import { StaffProfileEntity } from '@modules/core/entities';

export class BaseStaffWorkingHourDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Perfil del staff para el cual se registran las horas de trabajo',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @ApiProperty({
    example: 1,
    description: 'Número del día de la semana (1 = Lunes, 2 = Martes, etc.)',
  })
  @IsPositive(isPositiveValidationOptions())
  readonly weekday: number;

  @ApiProperty({
    example: '09:00',
    description: 'Hora de inicio del turno (formato HH:MM)',
  })
  @IsString(isStringValidationOptions())
  readonly startTime: string;

  @ApiProperty({
    example: '17:00',
    description: 'Hora de fin del turno (formato HH:MM)',
  })
  @IsString(isStringValidationOptions())
  readonly endTime: string;

  @ApiPropertyOptional({
    example: '12:00',
    description: 'Hora de inicio del descanso (opcional)',
  })
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakStart: string;

  @ApiPropertyOptional({
    example: '12:30',
    description: 'Hora de fin del descanso (opcional)',
  })
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly breakEnd: string;

  @ApiProperty({
    example: false,
    description: 'Indica si este día es un día libre para el staff',
  })
  @IsBoolean()
  readonly isDayOff: boolean;
}
