import { IsOptional, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterAppointmentServiceDto {
  @IsUUID('4', { message: 'La cita debe ser un UUID válido' })
  @IsOptional()
  readonly appointmentId?: string;

  @IsUUID('4', { message: 'El servicio debe ser un UUID válido' })
  @IsOptional()
  readonly serviceId?: string;

  @Type(() => Boolean)
  @IsOptional()
  readonly enabled?: boolean;

  @Type(() => Number)
  @IsOptional()
  readonly page?: number = 1;

  @Type(() => Number)
  @IsOptional()
  readonly limit?: number = 10;
}