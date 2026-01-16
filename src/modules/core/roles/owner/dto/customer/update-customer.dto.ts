import { PickType } from '@nestjs/swagger';
import { BaseCustomerDto } from './base-customer.dto';

export class UpdateCustomerDto extends PickType(BaseCustomerDto, [
  'referral',
  'taxIdentification',
  'taxName',
  'allergies',
]) {}
