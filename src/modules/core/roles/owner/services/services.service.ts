import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceEntity } from '@modules/core/entities';
import {
  CreateServiceDto,
  UpdateServiceDto,
  FilterServiceDto,
} from '../dto/services';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(CoreRepositoryEnum.SERVICE_REPOSITORY)
    private repository: Repository<ServiceEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA
  async findRuta1() {
    return {
      data: [
        {
          id: 'serv-test-001',
          name: 'Manicure',
          durationMin: 60,
          basePrice: 25.0,
          isEnabled: true,
        },
        {
          id: 'serv-test-002',
          name: 'Pestañas',
          durationMin: 90,
          basePrice: 35.0,
          isEnabled: true,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateServiceDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterServiceDto) {
    const {
      page = 1,
      limit = 10,
      enabled = true,
      isEnabled,
      branchId,
      categoryId,
    } = params;

    const query = this.repository.createQueryBuilder('service')
      .where('service.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (isEnabled !== undefined) {
      query.andWhere('service.isEnabled = :isEnabled', { isEnabled });
    }

    if (branchId) {
      query.andWhere('service.branchId = :branchId', { branchId });
    }

    if (categoryId) {
      query.andWhere('service.categoryId = :categoryId', { categoryId });
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
      throw new NotFoundException('Servicio no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateServiceDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Servicio no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Servicio no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
