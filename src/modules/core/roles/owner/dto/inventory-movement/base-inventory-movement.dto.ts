import { IsNotEmpty, IsString, IsNumber, IsOptional, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class InventoryMovementDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la sucursal donde se realiza el movimiento de inventario',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del producto involucrado en el movimiento de inventario',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la ubicación del inventario',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly location: CatalogueEntity;

  @ApiProperty({
    example: 'Modelo A',
    description: 'Tipo de modelo del producto',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @ApiPropertyOptional({
    example: 'ABC123',
    description: 'ID del modelo del producto (opcional)',
  })
  @IsOptional()
  @MaxLength(20, maxLengthValidationOptions())
  readonly modelId?: string;

  @ApiProperty({
    example: 'Ingreso',
    description: 'Tipo de movimiento del inventario (ej. "Ingreso", "Egreso")',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly type: string;

  @ApiPropertyOptional({
    example: 'Cambio de lote',
    description: 'Razón del movimiento de inventario (opcional)',
  })
  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly reason?: string;

  @ApiProperty({
    example: 100,
    description: 'Cantidad del producto involucrado en el movimiento',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}
