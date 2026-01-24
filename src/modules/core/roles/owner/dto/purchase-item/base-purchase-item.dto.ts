import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isNotEmptyValidationOptions, isNumberValidationOptions } from '@utils/dto-validation';
import { ProductEntity, PurchaseEntity } from '@modules/core/entities';

export class PurchaseItemDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la compra asociada a este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchase: PurchaseEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del producto asociado a este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly product: ProductEntity;

  @ApiProperty({
    example: 10,
    description: 'Cantidad del producto en este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;

  @ApiProperty({
    example: 5.5,
    description: 'Costo unitario del producto en este ítem',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unitCost: number;

  @ApiProperty({
    example: 55.0,
    description: 'Total por este ítem (cantidad * costo unitario)',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}
