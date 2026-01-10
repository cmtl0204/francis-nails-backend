import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { StaffWorkingHourEntity } from '@modules/core/entities';
import {
  CreateStaffWorkingHourDto,
  UpdateStaffWorkingHourDto,
  FilterStaffWorkingHourDto,
} from '../dto/staff-working-hour';

@Injectable()
export class StaffWorkingHoursService {
  constructor(
    @Inject(CoreRepositoryEnum.STAFF_WORKING_HOUR_REPOSITORY)
    private repository: Repository<StaffWorkingHourEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA
  async findRuta1() {
    return {
      data: [
        {
          id: 'wh-test-001',
          staffProfileId: 'staff-test-001',
          weekday: 1,
          startTime: '09:00',
          endTime: '18:00',
          breakStart: '13:00',
          breakEnd: '14:00',
          isDayOff: false,
        },
        {
          id: 'wh-test-002',
          staffProfileId: 'staff-test-001',
          weekday: 7,
          isDayOff: true,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateStaffWorkingHourDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterStaffWorkingHourDto) {
    const { page = 1, limit = 10, enabled = true, staffProfileId, weekday } = params;

    const query = this.repository.createQueryBuilder('wh')
      .where('wh.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (staffProfileId) {
      query.andWhere('wh.staffProfileId = :staffProfileId', { staffProfileId });
    }

    if (weekday) {
      query.andWhere('wh.weekday = :weekday', { weekday });
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
      throw new NotFoundException('Horario de trabajo no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateStaffWorkingHourDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Horario de trabajo no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);

    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Horario de trabajo no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
