import { PartialType } from '@nestjs/swagger';
import { BaseInvoiceDto } from './base-invoice.dto';

export class UpdateInvoiceDto extends PartialType(BaseInvoiceDto) {}