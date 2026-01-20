import { PickType } from '@nestjs/swagger';
import { PurchaseDto } from './base-purchase.dto';

export class CreatePurchaseDto extends PickType(PurchaseDto, [
  'branch',
  'supplier',
  'documentNumber',
  'purchasedAt',
  'subtotal',
  'tax',
  'total',
]) {}