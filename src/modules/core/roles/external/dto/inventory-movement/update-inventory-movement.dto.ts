import { PartialType } from '@nestjs/swagger';
import { BaseInventoryMovementDto } from './base-inventory-movement.dto';

export class UpdateInventoryMovementDto extends PartialType(BaseInventoryMovementDto) {}