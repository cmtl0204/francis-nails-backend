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

  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsPositive(isPositiveValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly durationMin: number;

  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly basePrice: number;
}
