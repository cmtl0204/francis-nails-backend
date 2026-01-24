import {
  IsString,
  IsOptional,
  MaxLength,
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isNotEmptyValidationOptions,
} from '@utils/dto-validation';
import { UserEntity } from '@auth/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseStaffProfileDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del usuario asociado al perfil del staff',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly user: UserEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Posición del staff en la organización',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly position: CatalogueEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Especialidad del staff ',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly specialty: CatalogueEntity;

  @ApiPropertyOptional({
    example: 'https://example.com/photo.jpg',
    description: 'URL de la foto del perfil del staff (opcional)',
  })
  @IsOptional()
  @MaxLength(255, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly photoUrl?: string;

  @ApiProperty({
    example: 'Dr. Juan Pérez',
    description: 'Nombre para mostrar del staff (por ejemplo, "Dr. Juan Pérez")',
  })
  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly displayName: string;

  @ApiProperty({
    example: 'Blue',
    description: 'Etiqueta de color asociada al staff (por ejemplo, "Blue")',
  })
  @MaxLength(55, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly colorTag: string;

  @ApiProperty({
    example: 'Percentage',
    description: 'Tipo de comisión para el staff (por ejemplo, "Percentage" o "Flat")',
  })
  @MaxLength(50, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly commissionType: string;

  @ApiPropertyOptional({
    example: 10.5,
    description:
      'Valor de la comisión del staff (opcional, solo si el tipo de comisión es "Percentage")',
  })
  @IsOptional()
  @IsNumber({}, isNumberValidationOptions())
  readonly commissionValue: number;
}
