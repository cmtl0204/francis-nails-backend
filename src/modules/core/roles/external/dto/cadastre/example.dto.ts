import { IsNotEmpty, IsOptional } from 'class-validator';

export class ExampleDto {
  @IsNotEmpty()
  readonly name: string;

  @IsOptional()
  readonly phone: string;
}
