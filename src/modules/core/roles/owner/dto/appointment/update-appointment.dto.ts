import { PickType } from '@nestjs/swagger';
import { BaseAppointmentDto } from './base-appointment.dto';

export class UpdateAppointmentDto extends PickType(BaseAppointmentDto, [
  'branch',
  'customer',
  'staffProfile',
  'status',
  'source',
  'startAt',
  'endAt',
  'notes',
]) {}
