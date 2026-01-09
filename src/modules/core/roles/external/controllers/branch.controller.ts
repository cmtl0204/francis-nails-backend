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
import { BranchService } from '../services/branch.service';

@ApiTags('External Branch')
@Auth()
@Controller('core/external/branches')
export class BranchController {
  constructor(private service: BranchService) {}

  @PublicRoute()
  @ApiOperation({summary: 'List all Branches'})
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
  @ApiOperation({summary: 'List all Branches'})
  @Post('/rutas')
  createdRuta(){
    const serviceResponse = this.service.createdRuta1({name:'Jorge', phone: '1233', email:'jorge@gmail.com', address: 'caupicho 3', city:'Quito'});

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados'
    }
  }

}
