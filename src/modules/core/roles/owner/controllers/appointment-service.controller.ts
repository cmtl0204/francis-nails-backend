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
import { AppointmentServiceService } from '../services/appointment-service.service';
import {
  CreateAppointmentServiceDto,
  UpdateAppointmentServiceDto,
  FilterAppointmentServiceDto,
} from '../dto/appointment-service';

@ApiTags('External Appointment Services')
@Auth()
@Controller('core/owner/appointment-service')
export class AppointmentServiceController {
  constructor(private service: AppointmentServiceService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Appointment Services' })
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
  @ApiOperation({ summary: 'Crear Appointment Service de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      appointmentId: '123e4567',
      serviceId: '123e4567',
      durationMin: 60,
      price: 25.50,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Appointment Services' })
  @Get()
  async findAll(@Query() params: FilterAppointmentServiceDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Appointment Service' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Appointment Service' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateAppointmentServiceDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Appointment Service' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateAppointmentServiceDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Appointment Service' })
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