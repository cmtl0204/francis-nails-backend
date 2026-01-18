import { PickType } from '@nestjs/swagger';
import { PaymentDto } from './base-payment.dto';

export class SeedPaymentDto extends PickType(PaymentDto, [
  'invoiceId',
  'methodId',
  'amount',
  'paidAt',
  'reference',
]) {}