import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, CustomerEntity, StaffProfileEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseAppointmentDto {
  @ApiProperty({
    example: { id: 'uuiid' },
    description: 'Sucursal donde se agenda la cita',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuiid' },
    description: 'Cliente de la cita',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customer: CustomerEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Perfil del staff asignado',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Estado de la cita',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly status: CatalogueEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Origen de la cita',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly source: CatalogueEntity;

  @ApiPropertyOptional({
    example: '2026-01-23T14:00:00.000Z',
  })
  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @ApiPropertyOptional({
    example: '2026-01-23T15:00:00.000Z',
  })
  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @ApiPropertyOptional({
    example: 'Cliente solicita atención preferencial',
  })
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly notes: string;
}
