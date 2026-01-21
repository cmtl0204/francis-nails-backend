import { PickType } from '@nestjs/swagger';
import { InvoiceDto } from './base-invoice.dto';

export class SeedInvoiceDto extends PickType(InvoiceDto, [
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