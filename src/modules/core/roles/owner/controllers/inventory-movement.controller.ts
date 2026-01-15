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
import { InventoryMovementService } from '../services/inventory-movement.service';
import {
  CreateInventoryMovementDto,
  UpdateInventoryMovementDto,
  FilterInventoryMovementDto,
} from '../dto/inventory-movement';

@ApiTags('External Inventory Movements')
@Auth()
@Controller('core/owner/inventory-movement')
export class InventoryMovementController {
  constructor(private service: InventoryMovementService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Inventory Movements' })
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
  @ApiOperation({ summary: 'Crear Inventory Movement de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: '123e4567-e89b-12d3-a456-426614174000',
      productId: '123e4567-e89b-12d3-a456-426614174001',
      locationId: '123e4567-e89b-12d3-a456-426614174002',
      modelType: 'purchases',
      modelId: '123e4567-e89b-12d3-a456-426614174003',
      type: 'in',
      reason: 'purchase',
      quantity: 50,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Inventory Movements' })
  @Get()
  async findAll(@Query() params: FilterInventoryMovementDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Inventory Movement' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Inventory Movement' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInventoryMovementDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Inventory Movement' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateInventoryMovementDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Inventory Movement' })
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