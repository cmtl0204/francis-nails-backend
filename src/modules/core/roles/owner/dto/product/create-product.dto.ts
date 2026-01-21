import { PickType } from '@nestjs/swagger';
import { ProductDto } from './base-product.dto';

export class CreateProductDto extends PickType(ProductDto, [
  'branch',
  'category',
  'sku',
  'name',
  'description',
  'unit',
  'costPrice',
  'salePrice',
  'trackStock',
  'enabled',
]) {}