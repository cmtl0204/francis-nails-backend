import { PartialType } from '@nestjs/swagger';
import { BaseSupplierDto } from './base-supplier.dto';

export class UpdateSupplierDto extends PartialType(BaseSupplierDto) {}