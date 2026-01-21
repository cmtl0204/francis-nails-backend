import { PickType } from '@nestjs/swagger';
import { PaymentDto } from './base-payment.dto';

export class UpdatePaymentDto extends PickType(PaymentDto, [
  'invoice',
  'methodId',
  'amount',
  'paidAt',
  'reference',
]) {}