import { PickType } from '@nestjs/swagger';
import { BaseStaffProfileDto } from './base-staff-profile.dto';

export class SeedStaffProfileDto extends PickType(BaseStaffProfileDto, [
  'user',
  'position',
  'photoUrl',
  'displayName',
  'specialty',
  'colorTag',
  'commissionType',
  'commissionValue',
]) {}
