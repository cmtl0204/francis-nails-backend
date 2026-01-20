import { PickType } from '@nestjs/swagger';
import { SupplierDto } from './base-supplier.dto';

export class SeedSupplierDto extends PickType(SupplierDto, [
  'branch',
  'name',
  'phone',
  'email',
  'identification',
  'address',
]) {}