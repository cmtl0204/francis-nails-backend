import { PickType } from '@nestjs/swagger';
import { BaseCustomerDto } from './base-customer.dto';

export class SeedCustomerDto extends PickType(BaseCustomerDto, [
  'referral',
  'user',
  'taxIdentification',
  'taxName',
  'allergies',
]) {}
