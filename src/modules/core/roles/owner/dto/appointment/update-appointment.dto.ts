import { PartialType } from '@nestjs/swagger';
import { BaseAppointmentDto } from './base-appointment.dto';

export class UpdateAppointmentDto extends PartialType(BaseAppointmentDto) {}
