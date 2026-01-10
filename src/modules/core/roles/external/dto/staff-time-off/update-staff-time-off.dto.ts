import { PartialType } from '@nestjs/swagger';
import { BaseStaffTimeOffDto } from './base-staff-time-off.dto';

export class UpdateStaffTimeOffDto extends PartialType(BaseStaffTimeOffDto) {}
