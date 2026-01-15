import { PartialType } from '@nestjs/swagger';
import { BaseAppointmentServiceDto } from './base-appointment-service.dto';

export class UpdateAppointmentServiceDto extends PartialType(BaseAppointmentServiceDto) {}