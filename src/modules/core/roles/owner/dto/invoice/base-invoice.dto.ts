import { IsNotEmpty, IsString, IsDecimal, IsNumber, IsOptional, IsDate } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { BranchEntity, CustomerEntity } from '@modules/core/entities';


export class InvoiceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customer: CustomerEntity;

  @IsNumber({},isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly statusId: number;
  
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly createdById: string;  

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly issuedAt: Date;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsDecimal({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly notes?: string;
}