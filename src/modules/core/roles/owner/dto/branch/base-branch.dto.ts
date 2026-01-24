import { IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { isStringValidationOptions, maxLengthValidationOptions } from '@utils/dto-validation';

export class BaseBranchDto {
  @ApiProperty({
    example: 'Sucursal Central',
    description: 'Nombre de la sucursal',
  })
  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly name: string;

  @ApiProperty({
    example: '+1 555-555-5555',
    description: 'Número de teléfono de la sucursal',
  })
  @MaxLength(20, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly phone: string;

  @ApiProperty({
    example: 'contacto@sucursal.com',
    description: 'Correo electrónico de la sucursal',
  })
  @MaxLength(150, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly email: string;

  @ApiProperty({
    example: '123 Calle Principal, Ciudad Ejemplo, 12345',
    description: 'Dirección de la sucursal',
  })
  @MaxLength(500, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly address: string;

  @ApiProperty({
    example: 'Ciudad Ejemplo',
    description: 'Ciudad de la sucursal',
  })
  @MaxLength(100, maxLengthValidationOptions())
  @IsString(isStringValidationOptions())
  readonly city: string;
}
