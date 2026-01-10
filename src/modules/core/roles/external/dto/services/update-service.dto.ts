import { PartialType } from '@nestjs/swagger';
import { BaseServiceDto } from './base-service.dto';

export class UpdateServiceDto extends PartialType(BaseServiceDto) {}
