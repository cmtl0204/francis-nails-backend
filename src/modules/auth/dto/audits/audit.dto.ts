import { IsString, IsNotEmpty } from 'class-validator';

import { UserEntity } from '@auth/entities';
import { isNotEmptyValidationOptions, isStringValidationOptions } from '@utils/dto-validation';

export class AuditDto {
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly modelId: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly user: UserEntity;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly event: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly ipAddress: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly values: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly url: string;

  @IsNotEmpty(isNotEmptyValidationOptions())
  @IsString(isStringValidationOptions())
  readonly hostname: string;
}
