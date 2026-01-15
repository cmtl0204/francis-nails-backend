import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { InvoiceEntity } from '@modules/core/entities';
import {
  CreateInvoiceDto,
  UpdateInvoiceDto,
  FilterInvoiceDto,
} from '../dto/invoice';

@Injectable()
export class InvoiceService {
  constructor(
    @Inject(CoreRepositoryEnum.INVOICE_REPOSITORY)
    private repository: Repository<InvoiceEntity>,
  ) {}

  // Método auxiliar para transformar DTOs en datos compatibles con TypeORM
  private transformDtoToEntityData(dto: CreateInvoiceDto | UpdateInvoiceDto): any {
    const data: any = { ...dto };
    
    // Transformar createdBy: string a createdBy: {id: string}
    if (data.createdBy && typeof data.createdBy === 'string') {
      data.createdBy = { id: data.createdBy } as any;
    }
    
    // Transformar branchId: string a branch: {id: string}
    if (data.branchId) {
      data.branch = { id: data.branchId } as any;
      delete data.branchId; // Eliminar porque ahora usamos 'branch'
    }
    
    // Transformar customerId: string a customer: {id: string}
    if (data.customerId) {
      data.customer = { id: data.customerId } as any;
      delete data.customerId; // Eliminar porque ahora usamos 'customer'
    }
    
    // Transformar statusId: number a status: {id: number}
    if (data.statusId !== undefined) {
      data.status = { id: data.statusId } as any;
      delete data.statusId; // Eliminar porque ahora usamos 'status'
    }
    
    return data;
  }

  async findRuta1() {
    return {
      data: [
        {
          invoiceNumber: 'FAC-001-0001',
          issuedAt: new Date(),
          subtotal: 100.00,
          discount: 10.00,
          tax: 10.80,
          total: 100.80,
          statusId: 2, // issued
        },
        {
          invoiceNumber: 'FAC-001-0002',
          issuedAt: new Date(),
          subtotal: 150.00,
          discount: 15.00,
          tax: 16.20,
          total: 151.20,
          statusId: 2, // issued
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateInvoiceDto) {
    // Transformar el DTO antes de crear la entidad
    const entityData = this.transformDtoToEntityData(payload);
    const entity = this.repository.create(entityData);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterInvoiceDto) {
    const { branchId, customerId, appointmentId, invoiceNumber, statusId, startDate, endDate, minTotal, maxTotal, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('i')
      .where('i.enabled = :enabled', { enabled });

    if (branchId) query.andWhere('i.branchId = :branchId', { branchId });
    if (customerId) query.andWhere('i.customerId = :customerId', { customerId });
    if (invoiceNumber) query.andWhere('i.invoiceNumber = :invoiceNumber', { invoiceNumber });
    if (statusId) query.andWhere('i.statusId = :statusId', { statusId });

    if (startDate && endDate) {
      query.andWhere('i.issuedAt BETWEEN :startDate AND :endDate', { startDate, endDate });
    } else if (startDate) {
      query.andWhere('i.issuedAt >= :startDate', { startDate });
    } else if (endDate) {
      query.andWhere('i.issuedAt <= :endDate', { endDate });
    }

    if (minTotal !== undefined) query.andWhere('i.total >= :minTotal', { minTotal });
    if (maxTotal !== undefined) query.andWhere('i.total <= :maxTotal', { maxTotal });

    const [data, total] = await query.getManyAndCount();

    return { data };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Factura no encontrada');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateInvoiceDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Factura no encontrada');
    }

    // Transformar el DTO antes de hacer merge
    const updateData = this.transformDtoToEntityData(payload);
    
    this.repository.merge(entity, updateData);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Factura no encontrada');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}