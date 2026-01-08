import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ServiceResponseHttpInterface } from '@utils/interfaces';
import { CadastreEntity } from '@modules/core/entities';
import {
  CreateCadastreDto,
  ExampleDto,
  UpdateCadastreDto,
} from '@modules/core/roles/external/dto/cadastre';
import { PaginationDto } from '@utils/dto';
import { PaginateFilterService } from '@utils/pagination/paginate-filter.service';
import { CoreRepositoryEnum } from '@utils/enums';

@Injectable()
export class CadastreService {
  private paginateFilterService: PaginateFilterService<CadastreEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CADASTRE_REPOSITORY)
    private readonly repository: Repository<CadastreEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  findRuta1() {
    return {
      data: [
        {
          name: 'juan',
          phone: '0987654321',
        },
        {
          name: 'maria',
          phone: '0987654321',
        },
      ],
    };
  }

  createdRuta(payload: ExampleDto) {
    const entity = this.repository.create();

    entity.enabled = false;
    entity.observation = payload.name;
    entity.systemOrigin = payload.phone;

    return {
      data: entity,
    };
  }

  async create(payload: CreateCadastreDto): Promise<ServiceResponseHttpInterface> {
    const entity = this.repository.create(payload);

    return { data: await this.repository.save(entity) };
  }

  async findAll(params: PaginationDto): Promise<ServiceResponseHttpInterface> {
    return this.paginateFilterService.execute(params, ['registerNumber', 'systemOrigin']);
  }

  async findOne(id: string): Promise<ServiceResponseHttpInterface> {
    const entity = await this.repository.findOne({
      where: { id },
    });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    return { data: entity };
  }

  async update(id: string, payload: UpdateCadastreDto): Promise<ServiceResponseHttpInterface> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    this.repository.merge(entity, payload);

    return { data: await this.repository.save(entity) };
  }

  async remove(id: string): Promise<ServiceResponseHttpInterface> {
    const entity = await this.repository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException('Registro no encontrado');
    }

    return { data: await this.repository.softRemove(entity) };
  }
}
