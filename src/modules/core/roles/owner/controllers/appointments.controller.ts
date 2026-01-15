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
import { AppointmentsService } from '../services/appointments.service';
import {
  CreateAppointmentDto,
  UpdateAppointmentDto,
  FilterAppointmentDto,
} from '../dto/appointment';

@ApiTags('Appointments')
@Auth()
@Controller('core/externals/appointments')
export class AppointmentsController {
  constructor(private service: AppointmentsService) {}

  //  ENDPOINTS DE PRUEBA
  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Appointments' })
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
  @ApiOperation({ summary: 'Crear Appointment de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: 'branch-test-001',
      customerId: 'cust-test-001',
      staffProfileId: 'staff-test-001',
      statusId: 1,
      sourceId: 1,
      startAt: new Date(),
      endAt: new Date(new Date().getTime() + 60 * 60 * 1000),
      notes: 'Cita demo',
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
  @ApiOperation({ summary: 'Listar citas' })
  @Get()
  async findAll(@Query() params: FilterAppointmentDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Obtener cita' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Crear cita' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateAppointmentDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Actualizar cita' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateAppointmentDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Eliminar cita' })
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
