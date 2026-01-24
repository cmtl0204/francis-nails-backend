import { IsNotEmpty, IsString, IsNumber, IsDate, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { BranchEntity, SupplierEntity } from '@modules/core/entities';

export class PurchaseDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la sucursal donde se realiza la compra',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del proveedor que realiza la venta',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly supplier: SupplierEntity;

  @ApiProperty({
    example: 'DOC123456',
    description: 'Número de documento de la compra',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly documentNumber: string;

  @ApiProperty({
    example: '2026-01-23T14:00:00.000Z',
    description: 'Fecha de la compra',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly purchasedAt: Date;

  @ApiProperty({
    example: 500.75,
    description: 'Subtotal de la compra antes de impuestos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @ApiProperty({
    example: 50.25,
    description: 'Impuesto aplicado en la compra',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @ApiProperty({
    example: 550.0,
    description: 'Total de la compra después de impuestos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}
