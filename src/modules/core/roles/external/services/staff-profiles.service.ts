import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { StaffProfileEntity } from '@modules/core/entities';
import {
  CreateStaffProfileDto,
  UpdateStaffProfileDto,
  FilterStaffProfileDto,
} from '../dto/staff-profile';

@Injectable()
export class StaffProfilesService {
  constructor(
    @Inject(CoreRepositoryEnum.STAFF_PROFILE_REPOSITORY)
    private repository: Repository<StaffProfileEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA
  async findRuta1() {
    return {
      data: [
        {
          id: 'staff-test-001',
          displayName: 'Majo',
          specialty: 'Uñas',
          colorTag: '#FF69B4',
          commissionType: 'percent',
          commissionValue: 10,
          enabled: true,
        },
        {
          id: 'staff-test-002',
          displayName: 'Katy',
          specialty: 'Pestañas',
          colorTag: '#8A2BE2',
          commissionType: 'fixed',
          commissionValue: 15,
          enabled: true,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateStaffProfileDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterStaffProfileDto) {
    const { page = 1, limit = 10, enabled = true, userId, positionId } = params;

    const query = this.repository.createQueryBuilder('staff')
      .where('staff.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (userId) {
      query.andWhere('staff.userId = :userId', { userId });
    }

    if (positionId) {
      query.andWhere('staff.positionId = :positionId', { positionId });
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
      throw new NotFoundException('Perfil de staff no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateStaffProfileDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Perfil de staff no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Perfil de staff no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
