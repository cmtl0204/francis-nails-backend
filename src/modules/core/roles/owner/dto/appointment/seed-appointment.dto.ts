import { PickType } from '@nestjs/swagger';
import { AppointmentDto } from './base-appointment.dto';

export class SeedAppointmentDto extends PickType(AppointmentDto, [
  'branchId',
  'customerId',
  'staffProfileId',
  'statusId',
  'sourceId',
  'startAt',
  'endAt',
  'notes',
  'enabled',
]) {}
