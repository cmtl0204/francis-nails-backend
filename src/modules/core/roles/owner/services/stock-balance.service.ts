import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { StockBalanceEntity } from '@modules/core/entities';
import {
  CreateStockBalanceDto,
  UpdateStockBalanceDto,
  FilterStockBalanceDto,
} from '../dto/stock-balance';

@Injectable()
export class StockBalanceService {
  constructor(
    @Inject(CoreRepositoryEnum.STOCK_BALANCE_REPOSITORY)
    private repository: Repository<StockBalanceEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          productId: 'prod-001',
          locationId: 'loc-001',
          quantity: 150,
        },
        {
          productId: 'prod-002',
          locationId: 'loc-002',
          quantity: 75,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateStockBalanceDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterStockBalanceDto) {
    const { page = 1, limit = 10, productId, locationId } = params;
    
    const query = this.repository.createQueryBuilder('sb')
      .where('sb.enabled = :enabled', { enabled: true })
      .skip((page - 1) * limit)
      .take(limit);

    if (productId) query.andWhere('sb.productId = :productId', { productId });
    if (locationId) query.andWhere('sb.locationId = :locationId', { locationId });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Balance de stock no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateStockBalanceDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Balance de stock no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Balance de stock no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}