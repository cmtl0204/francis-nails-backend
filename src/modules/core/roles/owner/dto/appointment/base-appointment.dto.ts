import { IsDate, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import {
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
} from '@utils/dto-validation';
import { BranchEntity, CustomerEntity, StaffProfileEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseAppointmentDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly customer: CustomerEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly staffProfile: StaffProfileEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly status: CatalogueEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly source: CatalogueEntity;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly notes: string;
}
