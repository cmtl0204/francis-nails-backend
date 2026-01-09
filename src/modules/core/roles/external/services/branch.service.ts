import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { BranchEntity } from '@modules/core/entities';
import { PaginateFilterService } from '@utils/pagination/paginate-filter.service';
import { BaseBranchDto } from '../dto/branch';

@Injectable()
export class BranchService {
  private paginateFilterService: PaginateFilterService<BranchEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CADASTRE_REPOSITORY)
    private repository: Repository<BranchEntity>,
  ) {
    this.paginateFilterService = new PaginateFilterService(this.repository);
  }

  findRuta1(){
  return{
    data: [
      {
      name: 'juan',
      phone: '09852922'
      },
      {
      name: 'jorge',
      phone: '0986565'
      }, 
    ],
  };
}

  createdRuta1(payload:BaseBranchDto){
  const entity = this.repository.create();
  entity.enabled=false;
  entity.email=payload.email;
  entity.address=payload.address;
  entity.city=payload.phone
  return{
    data: entity
  };
}


}