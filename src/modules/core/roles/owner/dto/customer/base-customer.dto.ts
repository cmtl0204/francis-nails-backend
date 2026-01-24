import { IsString, IsOptional, IsNotEmpty, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  isNotEmptyValidationOptions,
  isStringValidationOptions,
  maxLengthValidationOptions,
} from '@utils/dto-validation';
import { CustomerEntity } from '@modules/core/entities';
import { UserEntity } from '@auth/entities';

export class BaseCustomerDto {
  @ApiPropertyOptional({
    example: { id: 'uuid' },
    description: 'ID del cliente referido',
  })
  @IsOptional()
  readonly referral: CustomerEntity;

  @ApiProperty({
    example: { id: 'uuid' },
    description: 'ID del usuario asociado al cliente',
  })
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly user: UserEntity;

  @ApiProperty({
    example: 'ABC1234567890',
    description: 'Número de identificación fiscal del cliente',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly taxIdentification: string;

  @ApiProperty({
    example: 'Juan Pérez',
    description: 'Nombre fiscal del cliente',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  @IsNotEmpty(isNotEmptyValidationOptions())
  readonly taxName: string;


  @ApiPropertyOptional({
    example: 'Alergia a la penicilina',
    description: 'Alergias conocidas del cliente',
  })
  @IsString(isStringValidationOptions())
  @IsOptional()
  readonly allergies: string;

  constructor(customer: CustomerEntity) {
  this.taxIdentification = customer.taxIdentification;
  this.taxName = customer.taxName;
  
}
}
