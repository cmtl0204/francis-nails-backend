import { IsNotEmpty, IsString, IsDecimal, IsNumber, IsOptional, IsDate } from 'class-validator';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  isNumberValidationOptions,
} from '@utils/dto-validation';
import { Type } from 'class-transformer';
import { BranchEntity, CustomerEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';
import { UserEntity } from '@auth/entities';


export class InvoiceDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customer: CustomerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly status: CatalogueEntity;
  
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly createdBy: UserEntity;  

  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly invoiceNumber: string;

  @IsDate()
  @Type(() => Date)
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly issuedAt: Date;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly subtotal: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly discount: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly tax: number;

  @IsNumber({}, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly total: number;

  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly notes?: string;
}