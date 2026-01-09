import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Auth, PublicRoute } from '@auth/decorators';
import { CustomerService } from '../services/customer.service';

@ApiTags('Francis Customer')
@Auth()
@Controller('core/francis/customers')
export class CustomerController {
  constructor(private service: CustomerService) {}

  @PublicRoute()
  @ApiOperation({summary: 'List all Customers'})
  @Get('/rutas')
  ruta1(){
    const serviceResponse = this.service.findRuta1();

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados'
    }
  }

  @PublicRoute()
  @ApiOperation({summary: 'List all Customers'})
  @Post('/rutas')
  createdRuta(){
    const serviceResponse = this.service.createdRuta1({taxIdentification:'12345678912564564653456',taxName:'Messi',allergies:'' });

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados'
    }
  }

}
