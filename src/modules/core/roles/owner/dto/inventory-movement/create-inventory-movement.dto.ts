import { PickType } from '@nestjs/swagger';
import { InventoryMovementDto } from './base-inventory-movement.dto';

export class CreateInventoryMovementDto extends PickType(InventoryMovementDto, [
  'branch',
  'product',
  'location',
  'modelType',
  'modelId',
  'type',
  'reason',
  'quantity',
]) {}