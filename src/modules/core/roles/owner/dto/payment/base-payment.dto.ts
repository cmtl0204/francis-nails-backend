import { IsNotEmpty, IsString, IsDecimal, IsDate, IsOptional } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isNumberValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { InvoiceEntity } from '@modules/core/entities';

export class PaymentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoice: InvoiceEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly methodId: string;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly amount: number;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly paidAt: Date;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly reference?: string;
}