import { IsString, IsOptional, MaxLength, IsUUID, IsDecimal, IsNotEmpty } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isNumberValidationOptions,
  isNotEmptyValidationOptions
} from '@utils/dto-validation';
import { UserEntity } from '@auth/entities';
import { CatalogueEntity } from '@modules/common/catalogue/catalogue.entity';

export class BaseStaffProfileDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly user: UserEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly position: CatalogueEntity;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly photoUrl: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly displayName: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly specialty: string;

  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly colorTag: string;

  @IsString(isStringValidationOptions())
  @MaxLength(50, maxLengthValidationOptions())
  readonly commissionType: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }, isNumberValidationOptions())
  readonly commissionValue: number;
}
