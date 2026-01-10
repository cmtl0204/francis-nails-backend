import { Injectable, NotFoundException,Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { AppointmentEntity } from '@modules/core/entities';
import { CoreRepositoryEnum } from '@utils/enums';

import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  FilterAppointmentDto,
} from '../dto/appointment';

@Injectable()
export class AppointmentsService {
  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_REPOSITORY)
    private repository: Repository<AppointmentEntity>,
  ) {}

  //  ENDPOINT DE PRUEBA
  async findRuta1() {
    return {
      data: [
        {
          id: 'appt-test-001',
          branchId: 'branch-test-001',
          customerId: 'cust-test-001',
          staffProfileId: 'staff-test-001',
          statusId: 1,
          sourceId: 1,
          startAt: new Date(),
          endAt: new Date(new Date().getTime() + 60 * 60 * 1000),
          notes: 'Cita demo',
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateAppointmentDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterAppointmentDto) {
    const {
      page = 1,
      limit = 10,
      branchId,
      customerId,
      staffProfileId,
      statusId,
      sourceId,
    } = params;

    const query = this.repository.createQueryBuilder('appointment')
      .skip((page - 1) * limit)
      .take(limit);

    if (branchId) query.andWhere('appointment.branchId = :branchId', { branchId });
    if (customerId) query.andWhere('appointment.customerId = :customerId', { customerId });
    if (staffProfileId) query.andWhere('appointment.staffProfileId = :staffProfileId', { staffProfileId });
    if (statusId) query.andWhere('appointment.statusId = :statusId', { statusId });
    if (sourceId) query.andWhere('appointment.sourceId = :sourceId', { sourceId });

    const [data, total] = await query.getManyAndCount();

    return {
      data,
      pagination: { total, page, limit },
    };
  }

  async findOne(id: string) {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException('Cita no encontrada');
    return { data: entity };
  }

  async update(id: string, payload: UpdateAppointmentDto) {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) throw new NotFoundException('Cita no encontrada');
    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });
    if (!entity) throw new NotFoundException('Cita no encontrada');
    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}
