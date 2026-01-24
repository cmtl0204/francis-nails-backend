import {
  IsNotEmpty,
  IsString,
  IsDecimal,
  IsDate,
  IsOptional,
  IsNumber,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { InvoiceEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class PaymentDto {
  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID de la factura asociada al pago',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoice: InvoiceEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'Método de pago utilizado para la transacción',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly method: CatalogueEntity;

  @ApiProperty({
    example: 100.5,
    description: 'Monto total del pago realizado',
  })
  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly amount: number;

  @ApiProperty({
    example: '2026-01-23T14:00:00.000Z',
    description: 'Fecha y hora en la que se realizó el pago',
  })
  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly paidAt: Date;

  @ApiPropertyOptional({
    example: 'REF12345',
    description: 'Referencia del pago (opcional)',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reference: string;
}
