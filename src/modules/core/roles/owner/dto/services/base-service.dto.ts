import {
  IsString,
  IsOptional,
  MaxLength,
  IsInt,
  IsNumber,
  IsNotEmpty
} from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isNotEmptyValidationOptions
} from '@utils/dto-validation';
import { BranchEntity } from '@modules/core/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseServiceDto {

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly branch: BranchEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly category: CatalogueEntity;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  readonly description: string;

  @IsInt()
  readonly durationMin: number;

  @IsNumber({ maxDecimalPlaces: 2 }, isNumberValidationOptions())
  readonly basePrice: number;
}
