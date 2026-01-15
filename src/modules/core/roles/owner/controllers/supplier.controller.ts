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
import { SupplierService } from '../services/supplier.service';
import {
  CreateSupplierDto,
  UpdateSupplierDto,
  FilterSupplierDto,
} from '../dto/supplier';

@ApiTags('External Suppliers')
@Auth()
@Controller('core/external/supplier')
export class SupplierController {
  constructor(private service: SupplierService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Suppliers' })
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
  @ApiOperation({ summary: 'Crear Supplier de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: '123e4567-e89b-12d3-a456-426614174000',
      name: 'Proveedor de prueba',
      phone: '0999999999',
      email: 'proveedor@test.com',
      identification: '1234567890',
      address: 'Calle Principal 123',
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Suppliers' })
  @Get()
  async findAll(@Query() params: FilterSupplierDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Supplier' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Supplier' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateSupplierDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Supplier' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateSupplierDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Supplier' })
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