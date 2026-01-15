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
import { StaffTimeOffService } from '../services/staff-time-off.service';
import {
  CreateStaffTimeOffDto,
  UpdateStaffTimeOffDto,
  FilterStaffTimeOffDto,
} from '../dto/staff-time-off';

@ApiTags('Staff Time Off')
@Auth()
@Controller('core/externals/staff-time-off')
export class StaffTimeOffController {
  constructor(private service: StaffTimeOffService) {}

  //  ENDPOINTS DE PRUEBA
  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Staff Time Off' })
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
  @ApiOperation({ summary: 'Crear Staff Time Off de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      staffProfileId: 'staff-test-001',
      startAt: '2026-01-25T08:00:00Z',
      endAt: '2026-01-25T18:00:00Z',
      reason: 'Vacaciones',
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
  @ApiOperation({ summary: 'Listar tiempos libres' })
  @Get()
  async findAll(@Query() params: FilterStaffTimeOffDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Obtener tiempo libre' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Crear tiempo libre' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateStaffTimeOffDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Actualizar tiempo libre' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateStaffTimeOffDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Eliminar tiempo libre' })
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
