import { PickType } from '@nestjs/swagger';
import { InvoiceItemDto } from './base-invoice-item.dto';

export class CreateInvoiceItemDto extends PickType(InvoiceItemDto, [
  'invoice',
  'staff',
  'model',
  'modelType',
  'description',
  'quantity',
  'unitPrice',
  'discount',
  'tax',
  'total',
]) {}