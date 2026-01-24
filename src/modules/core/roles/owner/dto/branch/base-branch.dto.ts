import { IsString, MaxLength } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BaseBranchDto {
  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly phone: string;

  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly email: string;

  @MaxLength(500, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly address: string;

  @MaxLength(100, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly city: string;
}
