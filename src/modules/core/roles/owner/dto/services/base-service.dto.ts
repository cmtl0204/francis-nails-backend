import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsNumber,
  IsNotEmpty,
  IsPositive
} from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isNotEmptyValidationOptions,
  isPositiveValidationOptions
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseServiceDto {

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsPositive(isPositiveValidationOptions())
  readonly durationMin: number;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  readonly basePrice: number;
}
