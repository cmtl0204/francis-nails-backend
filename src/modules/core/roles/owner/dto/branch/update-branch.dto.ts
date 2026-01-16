import { PickType } from '@nestjs/swagger';
import { BranchDto } from './base-branch.dto';
import { IsOptional, IsString, MaxLength, IsBoolean } from 'class-validator';
import { isStringValidationOptions, maxLengthValidationOptions, isBooleanValidationOptions } from '@utils/dto-validation';

export class UpdateBranchDto extends PickType(BranchDto, [
  'name',
  'phone',
  'email',
  'address',
  'city',
  'enabled',
]) {
  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly name: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(20, maxLengthValidationOptions())
  readonly phone: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(150, maxLengthValidationOptions())
  readonly email: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(255, maxLengthValidationOptions())
  readonly address: string;

  @IsOptional()
  @IsString(isStringValidationOptions())
  @MaxLength(100, maxLengthValidationOptions())
  readonly city: string;

  @IsOptional()
  @IsBoolean(isBooleanValidationOptions())
  readonly enabled: boolean;
}
