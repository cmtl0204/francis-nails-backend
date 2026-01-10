import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';

export class BaseStaffProfileDto {
  @IsUUID('4', { message: 'El usuario debe ser un UUID válido' })
  readonly userId: string;

  @IsUUID('4', { message: 'La posición debe ser un UUID válido' })
  readonly positionId: string;

  @IsString()
  readonly displayName: string;

  @IsString()
  readonly specialty: string;

  @IsString()
  readonly colorTag: string;

  @IsString()
  readonly commissionType: string;

  @IsNumber()
  @IsOptional()
  readonly commissionValue?: number;

  @IsString()
  @IsOptional()
  readonly photoUrl?: string;

  @IsOptional()
  readonly enabled?: boolean;
}
