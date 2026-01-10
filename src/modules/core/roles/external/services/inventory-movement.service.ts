import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { InventoryMovementEntity } from '@modules/core/entities';
import {
  CreateInventoryMovementDto,
  UpdateInventoryMovementDto,
  FilterInventoryMovementDto,
} from '../dto/inventory-movement';

@Injectable()
export class InventoryMovementService {
  constructor(
    @Inject(CoreRepositoryEnum.INVENTORY_MOVEMENT_REPOSITORY)
    private repository: Repository<InventoryMovementEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          modelType: 'purchases',
          type: 'in',
          reason: 'compra',
          quantity: 50,
        },
        {
          modelType: 'invoices',
          type: 'out',
          reason: 'venta',
          quantity: 10,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateInventoryMovementDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterInventoryMovementDto) {
    const { page = 1, limit = 10, branchId, productId, locationId, modelType, type, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('im')
      .where('im.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (branchId) query.andWhere('im.branchId = :branchId', { branchId });
    if (productId) query.andWhere('im.productId = :productId', { productId });
    if (locationId) query.andWhere('im.locationId = :locationId', { locationId });
    if (modelType) query.andWhere('im.modelType = :modelType', { modelType });
    if (type) query.andWhere('im.type = :type', { type });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Movimiento de inventario no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateInventoryMovementDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Movimiento de inventario no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Movimiento de inventario no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}