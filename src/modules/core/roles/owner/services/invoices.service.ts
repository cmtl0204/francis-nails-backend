import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InvoiceEntity } from '@modules/core/entities';
import { CreateInvoiceDto, UpdateInvoiceDto } from '../dto/invoice';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class InvoiceService {
  private paginateFilterService: PaginateFilterService<InvoiceEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.INVOICE_REPOSITORY)
    private repository: Repository<InvoiceEntity>,
    @Inject(CoreRepositoryEnum.INVOICE_ITEM_REPOSITORY)
    private readonly invoiceItemsRepository: Repository<any>, 
    @Inject(CoreRepositoryEnum.PAYMENT_REPOSITORY)
    private readonly paymentsRepository: Repository<any>, 
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateInvoiceDto): Promise<InvoiceEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['invoiceNumber', 'notes'],
      relations: ['branch', 'customer', 'status', 'createdBy', 'items', 'payments'],
    });
  }

  async findOne(id: string): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'customer', 'status', 'createdBy', 'items', 'payments'],
    });
    if (!entity) throw new NotFoundException(`Factura no encontrada (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdateInvoiceDto): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Factura no encontrada para actualizar');
    
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<InvoiceEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Factura no encontrada para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findItems(invoiceId: string): Promise<any[]> {
    return await this.invoiceItemsRepository.find({
      where: { invoiceId },
      relations: ['staff', 'model'], 
      order: { createdAt: 'ASC' },
    });
  }

   async findPayments(invoiceId: string): Promise<any[]> {
     return await this.paymentsRepository.find({
      where: { invoiceId },
      relations: ['method'], 
      order: { paidAt: 'ASC' },
    });
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      where: { statusId: 2 },
      take: 1000,
      relations: ['customer'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}
