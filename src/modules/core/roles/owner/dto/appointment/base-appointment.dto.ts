import {
  IsString,
  IsBoolean,
  IsOptional,
  IsNotEmpty,
  IsDate,
  IsUUID,
  MaxLength,
} from 'class-validator';
import {
  isBooleanValidationOptions,
  isDateValidationOptions,
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class AppointmentDto {
  @IsOptional()
  @IsUUID()
  readonly branchId: string;

  @IsOptional()
  @IsUUID()
  readonly customerId: string;

  @IsOptional()
  @IsUUID()
  readonly staffProfileId: string;

  @IsOptional()
  readonly statusId: number;

  @IsOptional()
  readonly sourceId: number;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly startAt: Date;

  @IsOptional()
  @IsDate(isDateValidationOptions())
  readonly endAt: Date;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly notes: string;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly enabled: boolean;
}
