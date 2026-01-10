import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PurchaseEntity } from '@modules/core/entities';
import {
  CreatePurchaseDto,
  UpdatePurchaseDto,
  FilterPurchaseDto,
} from '../dto/purchase';

@Injectable()
export class PurchaseService {
  constructor(
    @Inject(CoreRepositoryEnum.PURCHASE_REPOSITORY)
    private repository: Repository<PurchaseEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          documentNumber: 'COMP-001',
          purchasedAt: new Date(),
          subtotal: 150.00,
          tax: 18.00,
          total: 168.00,
        },
        {
          documentNumber: 'COMP-002',
          purchasedAt: new Date(),
          subtotal: 200.00,
          tax: 24.00,
          total: 224.00,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreatePurchaseDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterPurchaseDto) {
    const { page = 1, limit = 10, branchId, supplierId, documentNumber, startDate, endDate, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('p')
      .where('p.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (branchId) query.andWhere('p.branchId = :branchId', { branchId });
    if (supplierId) query.andWhere('p.supplierId = :supplierId', { supplierId });
    if (documentNumber) query.andWhere('p.documentNumber = :documentNumber', { documentNumber });

    if (startDate && endDate) {
      query.andWhere('p.purchasedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    } else if (startDate) {
      query.andWhere('p.purchasedAt >= :startDate', { startDate });
    } else if (endDate) {
      query.andWhere('p.purchasedAt <= :endDate', { endDate });
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Compra no encontrada');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdatePurchaseDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Compra no encontrada');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Compra no encontrada');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}