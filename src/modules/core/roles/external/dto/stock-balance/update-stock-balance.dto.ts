import { PartialType } from '@nestjs/swagger';
import { BaseStockBalanceDto } from './base-stock-balance.dto';

export class UpdateStockBalanceDto extends PartialType(BaseStockBalanceDto) {}