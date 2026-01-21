import { PickType } from '@nestjs/swagger';
import { PurchaseItemDto } from './base-purchase-item.dto';

export class SeedPurchaseItemDto extends PickType(PurchaseItemDto, [
  'purchase',
  'product',
  'quantity',
  'unitCost',
  'total',
]) {}