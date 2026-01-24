import { IsString, IsOptional, MaxLength, IsNumber, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isNotEmptyValidationOptions,
  isPositiveValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseServiceDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Sucursal donde se encuentra disponible el servicio',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Categoría del servicio',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

  @ApiProperty({
    example: 'Servicio de Ejemplo',
    description: 'Nombre del servicio',
  })
  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @ApiPropertyOptional({
    example: 'Este es un servicio de ejemplo que se ofrece a los clientes.',
    description: 'Descripción opcional del servicio',
  })
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @ApiProperty({
    example: 30,
    description: 'Duración del servicio en minutos',
  })
  @IsPositive(isPositiveValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly durationMin: number;

  @ApiProperty({
    example: 99.99,
    description: 'Precio base del servicio',
  })
  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly basePrice: number;
}
