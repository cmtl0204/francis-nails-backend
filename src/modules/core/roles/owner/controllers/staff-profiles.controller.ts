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
import { StaffProfilesService } from '../services/staff-profiles.service';
import {
  CreateStaffProfileDto,
  UpdateStaffProfileDto,
  FilterStaffProfileDto,
} from '../dto/staff-profile';

@ApiTags('Staff Profiles')
@Auth()
@Controller('core/externals/staff-profiles')
export class StaffProfilesController {
  constructor(private service: StaffProfilesService) {}

  //  ENDPOINTS DE PRUEBA
  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Staff Profiles' })
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
  @ApiOperation({ summary: 'Crear Staff Profile de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      userId: 'user-test-001',
      positionId: 'position-test-001',
      displayName: 'Demo',
      specialty: 'Uñas',
      colorTag: '#000000',
      commissionType: 'none',
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
  @ApiOperation({ summary: 'Listar staff profiles' })
  @Get()
  async findAll(@Query() params: FilterStaffProfileDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Obtener staff profile' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Crear staff profile' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateStaffProfileDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Actualizar staff profile' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateStaffProfileDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Eliminar staff profile' })
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
