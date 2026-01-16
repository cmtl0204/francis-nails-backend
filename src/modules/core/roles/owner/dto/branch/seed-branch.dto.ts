import { PickType } from '@nestjs/swagger';
import { BranchDto } from './base-branch.dto';

export class SeedBranchDto extends PickType(BranchDto, [
  'name',
  'phone',
  'email',
  'address',
  'city',
  'enabled',
]) {}
