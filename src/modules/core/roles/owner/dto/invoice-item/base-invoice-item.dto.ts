import { IsNotEmpty, IsString, IsOptional, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { InvoiceEntity, ServiceEntity, StaffProfileEntity } from '@modules/core/entities';

export class InvoiceItemDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la factura asociada a este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoice: InvoiceEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del perfil del staff que está asignado a este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staff: StaffProfileEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del servicio asociado a este ítem',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly model: ServiceEntity;

  @ApiProperty({
    example: 'Servicio Básico',
    description: 'Tipo de modelo del servicio',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelType: string;

  @ApiProperty({
    example: 'Servicio de atención al cliente',
    description: 'Descripción del ítem de la factura',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly description: string;

  @ApiProperty({
    example: 2,
    description: 'Cantidad del servicio en este ítem',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly quantity: number;

  @ApiProperty({
    example: 100.0,
    description: 'Precio unitario del servicio',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly unitPrice: number;

  @ApiProperty({
    example: 20.0,
    description: 'Descuento aplicado al ítem',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @ApiProperty({
    example: 15.0,
    description: 'Impuesto aplicado al ítem',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @ApiProperty({
    example: 95.0,
    description: 'Total después de impuestos y descuentos',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;
}
