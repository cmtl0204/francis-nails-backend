import { IsOptional, IsString, IsUUID } from 'class-validator';
import { isNotEmptyValidationOptions } from '@utils/dto-validation';

export class BaseCustomerDto {
  @IsUUID('4', { message: 'El usuario debe ser un UUID válido' })
  readonly userId: string;

  @IsUUID('4', { message: 'La referencia debe ser un UUID válido' })
  @IsOptional()
  readonly referralId?: string;

  @IsString()
  @IsOptional()
  readonly taxIdentification?: string;

  @IsString()
  @IsOptional()
  readonly taxName?: string;

  @IsString()
  @IsOptional()
  readonly allergies?: string;

  @IsOptional()
  readonly enabled?: boolean;
}
