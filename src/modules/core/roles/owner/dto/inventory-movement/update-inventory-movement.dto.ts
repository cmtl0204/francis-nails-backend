import { PickType } from '@nestjs/swagger';
import { InventoryMovementDto } from './base-inventory-movement.dto';

export class UpdateInventoryMovementDto extends PickType(InventoryMovementDto, [
  'branch',
  'product',
  'locationId',
  'modelType',
  'modelId',
  'type',
  'reason',
  'quantity',
]) {}