import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { ProductEntity } from '@modules/core/entities';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dto/product';

@Injectable()
export class ProductService {
  constructor(
    @Inject(CoreRepositoryEnum.PRODUCT_REPOSITORY)
    private repository: Repository<ProductEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          sku: 'ESM-001',
          name: 'Esmalte profesional rojo',
          costPrice: 5.50,
          salePrice: 12.00,
          trackStock: true,
        },
        {
          sku: 'QUIT-001',
          name: 'Quitaesmalte sin acetona',
          costPrice: 3.80,
          salePrice: 8.50,
          trackStock: true,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateProductDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterProductDto) {
    const { page = 1, limit = 10, search, branchId, categoryId, sku, trackStock, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('p')
      .where('p.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.andWhere('(p.name ILIKE :search OR p.sku ILIKE :search OR p.description ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (branchId) query.andWhere('p.branchId = :branchId', { branchId });
    if (categoryId) query.andWhere('p.categoryId = :categoryId', { categoryId });
    if (sku) query.andWhere('p.sku = :sku', { sku });
    if (trackStock !== undefined) query.andWhere('p.trackStock = :trackStock', { trackStock });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Producto no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateProductDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Producto no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Producto no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}