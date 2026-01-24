import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isBooleanValidationOptions,
  isNumberValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class ProductDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la sucursal a la que pertenece el producto',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Categoría a la que pertenece el producto',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

  @ApiProperty({
    example: 'SKU123456',
    description: 'Código único del producto (SKU)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly sku: string;

  @ApiProperty({
    example: 'Producto Ejemplo',
    description: 'Nombre del producto',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @ApiPropertyOptional({
    example: 'Descripción detallada del producto',
    description: 'Descripción del producto (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly description: string;

  @ApiProperty({
    example: 'Unidad',
    description: 'Unidad de medida del producto (ej. "kg", "unidad", "litro")',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unit: string;

  @ApiProperty({
    example: 10.5,
    description: 'Precio de costo del producto',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly costPrice: number;

  @ApiProperty({
    example: 15.0,
    description: 'Precio de venta del producto',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly salePrice: number;

  @ApiProperty({
    example: true,
    description: 'Indica si el producto tiene stock rastreable',
  })
  @IsBoolean(isBooleanValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly trackStock: boolean;

  @ApiPropertyOptional({
    example: true,
    description: 'Indica si el producto está habilitado o no (opcional)',
  })
  @IsBoolean(isBooleanValidationOptions())
  @IsOptional()
  readonly enabled: boolean;
}
