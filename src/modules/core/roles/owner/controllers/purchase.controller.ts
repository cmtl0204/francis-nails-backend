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
import { PurchaseService } from '../services/purchase.service';
import {
  CreatePurchaseDto,
  UpdatePurchaseDto,
  FilterPurchaseDto,
} from '../dto/purchase';

@ApiTags('External Purchases')
@Auth()
@Controller('core/owner/purchase')
export class PurchaseController {
  constructor(private service: PurchaseService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Purchases' })
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
  @ApiOperation({ summary: 'Crear Purchase de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: '123e4567-e89b-12d3-a456-426614174000',
      supplierId: '123e4567-e89b-12d3-a456-426614174001',
      documentNumber: 'COMP-001',
      purchasedAt: new Date(),
      subtotal: 100.00,
      tax: 12.00,
      total: 112.00,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Purchases' })
  @Get()
  async findAll(@Query() params: FilterPurchaseDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Purchase' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Purchase' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreatePurchaseDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Purchase' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePurchaseDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Purchase' })
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