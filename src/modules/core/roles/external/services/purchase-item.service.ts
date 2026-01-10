import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PurchaseItemEntity } from '@modules/core/entities';
import {
  CreatePurchaseItemDto,
  UpdatePurchaseItemDto,
  FilterPurchaseItemDto,
} from '../dto/purchase-item';

@Injectable()
export class PurchaseItemService {
  constructor(
    @Inject(CoreRepositoryEnum.PUCRCHASE_ITEM_REPOSITORY)
    private repository: Repository<PurchaseItemEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          purchaseId: 'purchase-001',
          productId: 'prod-001',
          quantity: 10,
          unitCost: 5.50,
          total: 55.00,
        },
        {
          purchaseId: 'purchase-001',
          productId: 'prod-002',
          quantity: 5,
          unitCost: 8.00,
          total: 40.00,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreatePurchaseItemDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterPurchaseItemDto) {
    const { page = 1, limit = 10, purchaseId, productId } = params;
    
    const query = this.repository.createQueryBuilder('pi')
      .where('pi.enabled = :enabled', { enabled: true })
      .skip((page - 1) * limit)
      .take(limit);

    if (purchaseId) query.andWhere('pi.purchaseId = :purchaseId', { purchaseId });
    if (productId) query.andWhere('pi.productId = :productId', { productId });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Item de compra no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdatePurchaseItemDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Item de compra no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Item de compra no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}