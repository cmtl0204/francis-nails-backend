import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { BranchEntity } from '@modules/core/entities';
import {
  CreateBranchDto,
  UpdateBranchDto,
  FilterBranchDto,
} from '../dto/branch';

@Injectable()
export class BranchService {
  constructor(
    @Inject(CoreRepositoryEnum.BRANCH_REPOSITORY)
    private repository: Repository<BranchEntity>,
  ) {}

  //  Endpoint de prueba (GET)
async findRuta1() {
  return {
    data: [
      {
        id: 'branch-test-001',
        name: 'Sucursal Centro',
        phone: '0999999999',
        email: 'centro@test.com',
        address: 'Av. Principal 123',
        city: 'Quito',
        enabled: true,
      },
      {
        id: 'branch-test-002',
        name: 'Sucursal Norte',
        phone: '0888888888',
        email: 'norte@test.com',
        address: 'Calle Secundaria 456',
        city: 'Quito',
        enabled: true,
      },
    ],
  };
}

//  Endpoint de prueba (POST)
async createdRuta1(payload: any) {
  const entity = this.repository.create(payload);
  return { data: entity };
}


  async create(payload: CreateBranchDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterBranchDto) {
    const { page = 1, limit = 10, enabled = true, name } = params;

    const query = this.repository.createQueryBuilder('branch')
      .where('branch.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (name) {
      query.andWhere('LOWER(branch.name) LIKE LOWER(:name)', {
        name: `%${name}%`,
      });
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
      throw new NotFoundException('Sucursal no encontrada');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateBranchDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Sucursal no encontrada');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
