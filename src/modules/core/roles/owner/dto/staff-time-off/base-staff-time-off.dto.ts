import { IsNotEmpty, IsString, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  isStringValidationOptions,
  isDateValidationOptions,
  isNotEmptyValidationOptions,
} from '@utils/dto-validation';
import { StaffProfileEntity } from '@modules/core/entities';

export class BaseStaffTimeOffDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Perfil del staff que solicita el tiempo libre',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @ApiProperty({
    example: '2026-01-23T10:00:00.000Z',
    description: 'Fecha y hora de inicio del tiempo libre',
  })
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @ApiProperty({
    example: '2026-01-23T18:00:00.000Z',
    description: 'Fecha y hora de finalización del tiempo libre',
  })
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @ApiProperty({
    example: 'Vacaciones',
    description: 'Razón del tiempo libre (por ejemplo, "vacaciones", "enfermedad")',
  })
  @IsString(isStringValidationOptions())
  readonly reason: string;
}
