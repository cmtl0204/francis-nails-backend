import { PartialType } from '@nestjs/swagger';
import { BasePurchaseItemDto } from './base-purchase-item.dto';

export class UpdatePurchaseItemDto extends PartialType(BasePurchaseItemDto) {}