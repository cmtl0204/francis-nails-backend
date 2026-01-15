import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { InvoiceItemEntity } from '@modules/core/entities';
import {
  CreateInvoiceItemDto,
  UpdateInvoiceItemDto,
  FilterInvoiceItemDto,
} from '../dto/invoice-item';

@Injectable()
export class InvoiceItemService {
  constructor(
    @Inject(CoreRepositoryEnum.INVOICE__ITEM_REPOSITORY)
    private repository: Repository<InvoiceItemEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          invoiceId: 'invoice-001',
          modelType: 'product',
          description: 'Esmalte profesional',
          quantity: 2,
          unitPrice: 12.00,
          discount: 1.00,
          tax: 1.32,
          total: 24.32,
        },
        {
          invoiceId: 'invoice-001',
          modelType: 'service',
          description: 'Manicure básico',
          quantity: 1,
          unitPrice: 15.00,
          discount: 0,
          tax: 1.80,
          total: 16.80,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateInvoiceItemDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterInvoiceItemDto) {
    const { page = 1, limit = 10, invoiceId, staffId, modelType, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('ii')
      .where('ii.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (invoiceId) query.andWhere('ii.invoiceId = :invoiceId', { invoiceId });
    if (staffId) query.andWhere('ii.staffId = :staffId', { staffId });
    if (modelType) query.andWhere('ii.modelType = :modelType', { modelType });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Item de factura no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateInvoiceItemDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Item de factura no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Item de factura no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}