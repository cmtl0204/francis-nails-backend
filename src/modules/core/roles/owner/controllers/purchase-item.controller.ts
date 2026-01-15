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
import { PurchaseItemService } from '../services/purchase-item.service';
import {
  CreatePurchaseItemDto,
  UpdatePurchaseItemDto,
  FilterPurchaseItemDto,
} from '../dto/purchase-item';

@ApiTags('External Purchase Items')
@Auth()
@Controller('core/external/purchase-item')
export class PurchaseItemController {
  constructor(private service: PurchaseItemService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Purchase Items' })
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
  @ApiOperation({ summary: 'Crear Purchase Item de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      purchaseId: '123e4567-e89b-12d3-a456-426614174000',
      productId: '123e4567-e89b-12d3-a456-426614174001',
      quantity: 10,
      unitCost: 5.50,
      total: 55.00,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Purchase Items' })
  @Get()
  async findAll(@Query() params: FilterPurchaseItemDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Purchase Item' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Purchase Item' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreatePurchaseItemDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Purchase Item' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdatePurchaseItemDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Purchase Item' })
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