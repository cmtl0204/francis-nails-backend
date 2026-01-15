import { PartialType } from '@nestjs/swagger';
import { BaseStaffProfileDto } from './base-staff-profile.dto';

export class UpdateStaffProfileDto extends PartialType(BaseStaffProfileDto) {}
