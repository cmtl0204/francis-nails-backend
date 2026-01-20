import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PaymentEntity } from '@modules/core/entities';
import { CreatePaymentDto, UpdatePaymentDto } from '../dto/payment';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class PaymentsService {
  private paginateFilterService: PaginateFilterService<PaymentEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.PAYMENT_REPOSITORY)
    private repository: Repository<PaymentEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreatePaymentDto): Promise<PaymentEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['reference'],
      relations: ['invoice', 'method'],
    });
  }

  async findOne(id: string): Promise<PaymentEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['invoice', 'method'],
    });
    if (!entity) throw new NotFoundException(`Pago no encontrado (id: ${id})`);
    return entity;
  }

  async update(id: string, payload: UpdatePaymentDto): Promise<PaymentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Pago no encontrado para actualizar');
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<PaymentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Pago no encontrado para eliminar');
    return await this.repository.softRemove(entity);
  }

  async findByInvoiceId(invoiceId: string): Promise<PaymentEntity[]> {
    return await this.repository.find({
      where: { invoiceId },
      relations: ['method'],
      order: { paidAt: 'ASC' },
    });
  }

  async getTotalByInvoice(invoiceId: string): Promise<number> {
    const result = await this.repository
      .createQueryBuilder('payment')
      .select('SUM(payment.amount)', 'total')
      .where('payment.invoiceId = :invoiceId', { invoiceId })
      .andWhere('payment.deletedAt IS NULL')
      .getRawOne();
    
    return result?.total || 0;
  }

  async catalogue(): Promise<ServiceResponseHttpInterface> {
    const response = await this.repository.findAndCount({ 
      take: 1000,
      relations: ['invoice', 'method'],
    });
    return {
      data: response[0],
      pagination: { totalItems: response[1], limit: 10 },
    };
  }
}