import { PickType } from '@nestjs/swagger';
import { InvoiceDto } from './base-invoice.dto';

export class CreateInvoiceDto extends PickType(InvoiceDto, [
  'branch',
  'customer',
  'statusId',
  'createdById',
  'invoiceNumber',
  'issuedAt',
  'subtotal',
  'discount',
  'tax',
  'total',
  'notes',
]) {}
