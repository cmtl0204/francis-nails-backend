import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { SupplierEntity } from '@modules/core/entities';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  FilterSupplierDto,
} from '../dto/supplier';

@Injectable()
export class SupplierService {
  constructor(
    @Inject(CoreRepositoryEnum.SUPLIER_REPOSITORY)
    private repository: Repository<SupplierEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          name: 'Distribuidora Belleza SA',
          phone: '022345678',
          email: 'ventas@belleza.com',
          identification: '1234567890001',
        },
        {
          name: 'Importadora Cosmética',
          phone: '022987654',
          email: 'info@cosmetica.com',
          identification: '9876543210001',
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateSupplierDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterSupplierDto) {
    const { page = 1, limit = 10, search, branchId, identification, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('s')
      .where('s.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (search) {
      query.andWhere('(s.name ILIKE :search OR s.email ILIKE :search)', {
        search: `%${search}%`,
      });
    }

    if (branchId) query.andWhere('s.branchId = :branchId', { branchId });
    if (identification) query.andWhere('s.identification = :identification', { identification });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateSupplierDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}