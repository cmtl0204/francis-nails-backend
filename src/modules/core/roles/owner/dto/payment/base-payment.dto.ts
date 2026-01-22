import { IsNotEmpty, IsString, IsDecimal, IsDate, IsOptional, IsNumber, MaxLength } from 'class-validator';
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
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoice: InvoiceEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly method: CatalogueEntity;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly amount: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly paidAt: Date;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reference: string;
}