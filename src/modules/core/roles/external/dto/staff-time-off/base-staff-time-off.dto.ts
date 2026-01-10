import { IsDateString, IsOptional, IsString, IsUUID } from 'class-validator';

export class BaseStaffTimeOffDto {
  @IsUUID('4', { message: 'El staffProfileId debe ser un UUID válido' })
  readonly staffProfileId: string;

  @IsDateString({}, { message: 'La fecha de inicio debe ser válida' })
  readonly startAt: Date;

  @IsDateString({}, { message: 'La fecha de fin debe ser válida' })
  readonly endAt: Date;

  @IsString()
  readonly reason: string;

  @IsOptional()
  readonly enabled?: boolean;
}
