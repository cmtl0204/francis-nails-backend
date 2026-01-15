import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { StaffTimeOffEntity } from '@modules/core/entities';
import {
  CreateStaffTimeOffDto,
  UpdateStaffTimeOffDto,
  FilterStaffTimeOffDto,
} from '../dto/staff-time-off';

@Injectable()
export class StaffTimeOffService {
  constructor(
    @Inject(CoreRepositoryEnum.STAFF_TIME_OFF_REPOSITORY)
    private repository: Repository<StaffTimeOffEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA
  async findRuta1() {
    return {
      data: [
        {
          id: 'sto-test-001',
          staffProfileId: 'staff-test-001',
          startAt: '2026-01-15T08:00:00Z',
          endAt: '2026-01-15T18:00:00Z',
          reason: 'Vacaciones',
          enabled: true,
        },
        {
          id: 'sto-test-002',
          staffProfileId: 'staff-test-002',
          startAt: '2026-01-20T08:00:00Z',
          endAt: '2026-01-20T12:00:00Z',
          reason: 'Cita médica',
          enabled: true,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateStaffTimeOffDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterStaffTimeOffDto) {
    const { page = 1, limit = 10, enabled = true, staffProfileId } = params;

    const query = this.repository.createQueryBuilder('sto')
      .where('sto.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (staffProfileId) {
      query.andWhere('sto.staffProfileId = :staffProfileId', { staffProfileId });
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
      throw new NotFoundException('Tiempo libre no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateStaffTimeOffDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Tiempo libre no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Tiempo libre no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
