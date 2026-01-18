import { PickType } from '@nestjs/swagger';
import { PaymentDto } from './base-payment.dto';

export class CreatePaymentDto extends PickType(PaymentDto, [
  'invoiceId',
  'methodId',
  'amount',
  'paidAt',
  'reference',
]) {}