import { IsString, IsOptional, MaxLength, IsBoolean } from 'class-validator';
import {
  isStringValidationOptions,
  maxLengthValidationOptions,
  isBooleanValidationOptions,
} from '@utils/dto-validation';

export class BranchDto {
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly phone: string;

  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly email: string;

  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly address: string;

  @IsString(isStringValidationOptions())
  @MaxLength(100, maxLengthValidationOptions())
  readonly city: string;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly enabled: boolean;
}
