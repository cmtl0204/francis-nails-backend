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
import {
  CreateBranchDto,
  UpdateBranchDto,
  FilterBranchDto,
} from '../dto/branch';

@ApiTags('Branches')
@Auth()
@Controller('core/externals/branches')
export class BranchController {
  constructor(private service: BranchService) {}

  @PublicRoute()
@ApiOperation({ summary: 'Endpoint de prueba para Branches' })
@Get('/rutas')
async ruta1() {
  const serviceResponse = await this.service.findRuta1();

  return {
    data: serviceResponse.data,
    message: 'Registros Consultados',
    title: 'Consultados',
  };
}

@PublicRoute()
@ApiOperation({ summary: 'Crear Branch de prueba' })
@Post('/rutas')
async createdRuta() {
  const payload = {
    name: 'Sucursal Demo',
    phone: '0777777777',
    email: 'demo@sucursal.com',
    address: 'Av. Demo 123',
    city: 'Guayaquil',
    enabled: true,
  };

  const serviceResponse = await this.service.createdRuta1(payload);

  return {
    data: serviceResponse.data,
    message: 'Registros Consultados',
    title: 'Consultados',
  };
}



  //@PublicRoute()
  @ApiOperation({ summary: 'Listar sucursales' })
  @Get()
  async findAll(@Query() params: FilterBranchDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  //@PublicRoute()
  @ApiOperation({ summary: 'Obtener sucursal' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  //@PublicRoute()
  @ApiOperation({ summary: 'Crear sucursal' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateBranchDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  //@PublicRoute()
  @ApiOperation({ summary: 'Actualizar sucursal' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateBranchDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  //@PublicRoute()
  @ApiOperation({ summary: 'Eliminar sucursal' })
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.remove(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Eliminado',
      title: 'Eliminado',
    };
  }
}
