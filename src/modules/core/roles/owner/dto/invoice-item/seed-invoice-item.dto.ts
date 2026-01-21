import { PickType } from '@nestjs/swagger';
import { InvoiceItemDto } from './base-invoice-item.dto';

export class SeedInvoiceItemDto extends PickType(InvoiceItemDto, [
  'invoice',
  'staff',
  'modelType',
  'model',
  'description',
  'quantity',
  'unitPrice',
  'discount',
  'tax',
  'total',
]) {}