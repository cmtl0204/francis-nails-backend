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
  @MaxLength(255, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())

  readonly photoUrl: string;

  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly displayName: string;

  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly specialty: string;

  @MaxLength(55, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly colorTag: string;

  @MaxLength(50, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly commissionType: string;

  @IsOptional()
  @IsDecimal({ decimal_digits: '0,2' }, isNumberValidationOptions())
  readonly commissionValue: number;
}
