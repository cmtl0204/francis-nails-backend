import { IsNotEmpty, IsString } from 'class-validator';

export class PasswordChangeDto {
  @IsNotEmpty()
  @IsString()
  password: string;
}
