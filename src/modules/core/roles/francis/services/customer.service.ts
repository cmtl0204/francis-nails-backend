import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '@utils/enums';
import { CustomerEntity } from '@modules/core/entities';
import { PaginateFilterService } from '@utils/pagination/paginate-filter.service';
import { BaseCustomerDto } from '../dto/customer';

@Injectable()
export class CustomerService {
  private paginateFilterService: PaginateFilterService<CustomerEntity>;

  constructor(
    @Inject(CoreRepositoryEnum.CUSTOMER_REPOSITORY)
    private repository: Repository<CustomerEntity>,
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

  createdRuta1(payload: BaseCustomerDto){
  const entity = this.repository.create();
  entity.enabled=false;
  entity.taxName=payload.taxName;
  entity.taxIdentification=payload.taxIdentification;
  entity.allergies=payload.taxIdentification
  return{
    data: entity
  };
}

}