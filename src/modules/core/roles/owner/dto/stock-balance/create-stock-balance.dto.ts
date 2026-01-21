import { PickType } from '@nestjs/swagger';
import { StockBalanceDto } from './base-stock-balance.dto';

export class CreateStockBalanceDto extends PickType(StockBalanceDto, [
  'product',
  'locationId',
  'quantity',
]) {}