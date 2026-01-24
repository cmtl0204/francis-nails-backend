import { IsNotEmpty, IsString, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';

export class SupplierDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Sucursal asociada al proveedor',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: 'Proveedor S.A.',
    description: 'Nombre del proveedor',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @ApiPropertyOptional({
    example: '+1234567890',
    description: 'Número de teléfono del proveedor (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly phone: string;

  @ApiPropertyOptional({
    example: 'supplier@example.com',
    description: 'Correo electrónico del proveedor (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly email: string;

  @ApiPropertyOptional({
    example: 'ABC12345',
    description: 'Identificación del proveedor (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly identification: string;

  @ApiPropertyOptional({
    example: 'Calle Falsa 123, Ciudad',
    description: 'Dirección del proveedor (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly address: string;
}
