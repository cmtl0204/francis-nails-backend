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
import { ServicesService } from '../services/services.service';
import {
  CreateServiceDto,
  UpdateServiceDto,
  FilterServiceDto,
} from '../dto/services';

@ApiTags('Services')
@Auth()
@Controller('core/externals/services')
export class ServicesController {
  constructor(private service: ServicesService) {}

  // ENDPOINTS DE PRUEBA
  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Services' })
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
  @ApiOperation({ summary: 'Crear Service de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: 'branch-test-001',
      categoryId: 'cat-test-001',
      name: 'Servicio Demo',
      durationMin: 45,
      basePrice: 20,
      isEnabled: true,
      enabled: true,
    };

    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  //  CRUD REAL
  @ApiOperation({ summary: 'Listar servicios' })
  @Get()
  async findAll(@Query() params: FilterServiceDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Obtener servicio' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Crear servicio' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateServiceDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Actualizar servicio' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateServiceDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Eliminar servicio' })
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
