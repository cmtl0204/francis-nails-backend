import { PickType } from '@nestjs/swagger';
import { BaseStaffTimeOffDto } from './base-staff-time-off.dto';

export class UpdateStaffTimeOffDto extends PickType(BaseStaffTimeOffDto, [
  'staffProfile',
  'startAt',
  'endAt',
  'reason',
]) {}
