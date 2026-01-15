import { PartialType } from '@nestjs/swagger';
import { BaseInvoiceItemDto } from './base-invoice-item.dto';

export class UpdateInvoiceItemDto extends PartialType(BaseInvoiceItemDto) {}