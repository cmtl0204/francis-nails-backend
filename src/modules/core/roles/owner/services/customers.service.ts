import { Injectable, NotFoundException,  Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { BaseCustomerDto, CreateCustomerDto, UpdateCustomerDto } from '../dto/customer';
import { CustomerEntity } from '@modules/core/entities';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CoreRepositoryEnum } from '@utils/enums';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';

@Injectable()
export class CustomerService {
  private paginateFilterService: PaginateFilterService<CustomerEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CUSTOMER_REPOSITORY)
    private repository: Repository<CustomerEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateCustomerDto): Promise<CustomerEntity> {
    const entity = this.repository.create(payload);
    console.log(entity);

    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['taxName', 'taxIdentification'],
      relations: ['user', 'referral'],
    });
  }


  //
  async findByTaxIdentification(taxIdentification: string): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({
      where: { taxIdentification },
      relations: ['user', 'referral'],
    });

    if (!entity) {
      throw new NotFoundException(`Cliente no encontrado (taxIdentification: ${taxIdentification})`);
    }

    return entity;
  }
  //

  async findOne(id: string): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['user', 'referral'],
    });
    if (!entity) {
      throw new NotFoundException(`Cliente no encontrado (id: ${id})`);
    }
    return entity;
  }

  async update(id: string, payload: UpdateCustomerDto): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Cliente no encontrado para actualizar');
    }
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<CustomerEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) {
      throw new NotFoundException('Cliente no encontrado para eliminar');
    }
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<CustomerEntity[]> {
    return await this.repository.find();
  }
}
