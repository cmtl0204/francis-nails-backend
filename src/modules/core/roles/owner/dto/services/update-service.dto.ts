import { PickType } from '@nestjs/swagger';
import { BaseServiceDto } from './base-service.dto';

export class UpdateServiceDto extends PickType(BaseServiceDto, [
  'branch',
  'category',
  'name',
  'description',
  'durationMin',
  'basePrice',
]) {}
