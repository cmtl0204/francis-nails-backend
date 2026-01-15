import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { AppointmentServiceEntity } from '@modules/core/entities';
import {
  CreateAppointmentServiceDto,
  UpdateAppointmentServiceDto,
  FilterAppointmentServiceDto,
} from '../dto/appointment-service';

@Injectable()
export class AppointmentServiceService {
  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_SERVICE_REPOSITORY)
    private repository: Repository<AppointmentServiceEntity>,
  ) {}

  async findRuta1() {
    return {
      data: [
        {
          appointmentId: 'test-001',
          serviceId: 'serv-001',
          durationMin: 60,
          price: 25.50,
        },
        {
          appointmentId: 'test-002',
          serviceId: 'serv-002',
          durationMin: 90,
          price: 35.00,
        },
      ],
    };
  }

  async createdRuta1(payload: any) {
    const entity = this.repository.create(payload);
    return { data: entity };
  }

  async create(payload: CreateAppointmentServiceDto) {
    const entity = this.repository.create(payload);
    const saved = await this.repository.save(entity);
    return { data: saved };
  }

  async findAll(params: FilterAppointmentServiceDto) {
    const { page = 1, limit = 10, appointmentId, serviceId, enabled = true } = params;
    
    const query = this.repository.createQueryBuilder('as')
      .where('as.enabled = :enabled', { enabled })
      .skip((page - 1) * limit)
      .take(limit);

    if (appointmentId) {
      query.andWhere('as.appointmentId = :appointmentId', { appointmentId });
    }

    if (serviceId) {
      query.andWhere('as.serviceId = :serviceId', { serviceId });
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
      throw new NotFoundException('Servicio de cita no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateAppointmentServiceDto) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Servicio de cita no encontrado');
    }

    this.repository.merge(entity, payload);
    const updated = await this.repository.save(entity);
    return { data: updated };
  }

  async remove(id: string) {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Servicio de cita no encontrado');
    }

    const removed = await this.repository.softRemove(entity);
    return { data: removed };
  }
}