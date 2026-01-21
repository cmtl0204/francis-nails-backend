import { PickType } from '@nestjs/swagger';
import { ProductDto } from './base-product.dto';

export class UpdateProductDto extends PickType(ProductDto, [
  'branch',
  'categoryId',
  'sku',
  'name',
  'description',
  'unit',
  'costPrice',
  'salePrice',
  'trackStock',
  'enabled',
]) {}