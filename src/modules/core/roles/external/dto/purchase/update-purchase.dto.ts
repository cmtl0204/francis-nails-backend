import { PartialType } from '@nestjs/swagger';
import { BasePurchaseDto } from './base-purchase.dto';

export class UpdatePurchaseDto extends PartialType(BasePurchaseDto) {}