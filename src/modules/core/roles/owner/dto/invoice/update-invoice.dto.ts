import { PickType } from '@nestjs/swagger';
import { InvoiceDto } from './base-invoice.dto';

export class UpdateInvoiceDto extends PickType(InvoiceDto, [
  'branch',
  'customer',
  'status',
  'createdBy',
  'invoiceNumber',
  'issuedAt',
  'subtotal',
  'discount',
  'tax',
  'total',
  'notes',
]) {}