import { PickType } from '@nestjs/swagger';
import { UserDto } from '@auth/dto';
import { IsOptional, IsString, MinLength } from 'class-validator';
import { minLengthValidationOptions } from '@utils/dto-validation';

export class UpdateProfileDto extends PickType(UserDto, [
  'avatar',
  'bloodType',
  'ethnicOrigin',
  'identificationType',
  'gender',
  'maritalStatus',
  'sex',
  'birthdate',
  'identification',
  'lastname',
  'name',
  'email',
  'personalEmail',
  'cellPhone',
  'phone',
  'username',
  'nationality',
  'allergies',
]) {
  @IsOptional()
  @IsString()
  @MinLength(8, minLengthValidationOptions())
  readonly password: string;
}
