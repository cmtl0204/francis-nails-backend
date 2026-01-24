import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { ProductEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class StockBalanceDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del producto asociado a este balance de inventario',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Ubicación donde se almacena el producto (por ejemplo, "Almacén 1")',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly location: CatalogueEntity;

  @ApiProperty({
    example: 150,
    description: 'Cantidad disponible de este producto en la ubicación especificada',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;
}
