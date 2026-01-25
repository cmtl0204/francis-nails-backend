import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository,Between, MoreThanOrEqual, LessThanOrEqual } from 'typeorm';
import { AppointmentEntity } from '@modules/core/entities';
import { CreateAppointmentDto, UpdateAppointmentDto } from '../dto/appointment';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { PaginateFilterService, PaginationDto } from '@utils/pagination';
import { CoreRepositoryEnum } from '@utils/enums';
import { AppointmentFilterDto } from '../dto/appointment/AppointmentFilterDto';

@Injectable()
export class AppointmentService {
  private paginateFilterService: PaginateFilterService<AppointmentEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.APPOINTMENT_REPOSITORY)
    private repository: Repository<AppointmentEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  async create(payload: CreateAppointmentDto): Promise<AppointmentEntity> {
    const entity = this.repository.create(payload);
    return await this.repository.save(entity);
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute({
      params,
      searchFields: ['notes'],
      relations: ['branch', 'customer', 'staffProfile', 'status', 'source'],
    });
  }

  async findOne(id: string): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({
      where: { id },
      relations: ['branch', 'customer', 'staffProfile', 'status', 'source'],
    });
    if (!entity) throw new NotFoundException(`Cita no encontrada (find one)`);
    return entity;
  }

  //

async findWithFilters(
  params: AppointmentFilterDto,
): Promise<ServiceResponseHttpInterface> {
  const { page = 1, limit = 10, startDate, endDate } = params;

  const query = this.repository
    .createQueryBuilder('appointment')
    .leftJoinAndSelect('appointment.branch', 'branch')
    .leftJoinAndSelect('appointment.customer', 'customer')
    .leftJoinAndSelect('appointment.staffProfile', 'staffProfile')
    .leftJoinAndSelect('appointment.status', 'status')
    .leftJoinAndSelect('appointment.source', 'source');

  if (startDate) {
    query.andWhere('appointment.startAt >= :startDate', {
      startDate: `${startDate} 00:00:00`,
    });
  }

  if (endDate) {
    query.andWhere('appointment.startAt <= :endDate', {
      endDate: `${endDate} 23:59:59`,
    });
  }

  const [data, total] = await query
    .skip((page - 1) * limit)
    .take(limit)
    .getManyAndCount();

  return {
    data,
    pagination: {
      totalItems: total,
      page,
      limit,
    },
  };
}


//

  async update(id: string, payload: UpdateAppointmentDto): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Cita no encontrada para actualizar`);
    this.repository.merge(entity, payload);
    return await this.repository.save(entity);
  }

  async remove(id: string): Promise<AppointmentEntity> {
    const entity = await this.repository.findOne({ where: { id } });
    if (!entity) throw new NotFoundException(`Cita no encontrada para eliminar`);
    return await this.repository.softRemove(entity);
  }

  async catalogue(): Promise<AppointmentEntity[]> {
    return await this.repository.find();
     
  }
}
