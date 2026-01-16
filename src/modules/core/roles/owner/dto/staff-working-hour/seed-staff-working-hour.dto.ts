import { PickType } from '@nestjs/swagger';
import {  BaseStaffWorkingHourDto } from './base-staff-working-hour.dto';

export class SeedStaffWorkingHourDto extends PickType( BaseStaffWorkingHourDto, [
  'staffProfile',
  'weekday',
  'startTime',
  'endTime',
  'breakStart',
  'breakEnd',
  'isDayOff',
]) {}
