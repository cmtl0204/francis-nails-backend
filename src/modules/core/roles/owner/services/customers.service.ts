import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { CustomerEntity } from '@modules/core/entities';
import {
  CreateCustomerDto,
  UpdateCustomerDto,
  FilterCustomerDto,
} from '../dto/customer';

@Injectable()
export class CustomersService {
  constructor(
    @Inject(CoreRepositoryEnum.CUSTOMER_REPOSITORY)
    private repository: Repository<CustomerEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA (GET)
  async findRuta1() {
    return {
      data: [
        {
          id: 'cust-test-001',
          userId: 'user-test-001',
          taxIdentification: '0102030405',
          taxName: 'Juan Pérez',
          allergies: 'Ninguna',
          enabled: true,
        },
        {
          id: 'cust-test-002',
          userId: 'user-test-002',
          taxIdentification: '9999999999',
          taxName: 'María López',
          allergies: 'Polen',
          enabled: true,
        },
      ],
    };
  }

  //  ENDPOINT DE PRUEBA (POST)
  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateCustomerDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterCustomerDto) {
    const { page = 1, limit = 10, enabled = true, userId, referralId } = params;

    const query = this.repository.createQueryBuilder('customer')
      .where('customer.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (userId) {
      query.andWhere('customer.userId = :userId', { userId });
    }

    if (referralId) {
      query.andWhere('customer.referralId = :referralId', { referralId });
    }

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Cliente no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateCustomerDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Cliente no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Cliente no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
