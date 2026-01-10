import { PartialType } from '@nestjs/swagger';
import { BaseStaffWorkingHourDto } from './base-staff-working-hour.dto';

export class UpdateStaffWorkingHourDto extends PartialType(BaseStaffWorkingHourDto) {}
