import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsNumber,
  IsOptional,
  IsDate,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isNumberValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { BranchEntity, CustomerEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { UserEntity } from '@auth/entities';

export class InvoiceDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la sucursal donde se genera la factura',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del cliente asociado a la factura',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customer: CustomerEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Estado de la factura',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly status: CatalogueEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del usuario que generó la factura',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly createdBy: UserEntity;

  @ApiProperty({
    example: 'INV123456',
    description: 'Número de factura',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceNumber: string;

  @ApiProperty({
    example: '2026-01-23T14:00:00.000Z',
    description: 'Fecha y hora de emisión de la factura',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly issuedAt: Date;

  @ApiProperty({
    example: 500.75,
    description: 'Subtotal de la factura antes de impuestos y descuentos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @ApiProperty({
    example: 50.25,
    description: 'Descuento aplicado en la factura',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @ApiProperty({
    example: 70.5,
    description: 'Impuesto aplicado a la factura',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @ApiProperty({
    example: 520.0,
    description: 'Total de la factura después de impuestos y descuentos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;

  @ApiPropertyOptional({
    example: 'Factura generada por compra de productos electrónicos',
    description: 'Notas adicionales sobre la factura (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly notes: string;
}
