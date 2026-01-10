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
import { InvoiceItemService } from '../services/invoice-item.service';
import {
  CreateInvoiceItemDto,
  UpdateInvoiceItemDto,
  FilterInvoiceItemDto,
} from '../dto/invoice-item';

@ApiTags('External Invoice Items')
@Auth()
@Controller('core/external/invoice-item')
export class InvoiceItemController {
  constructor(private service: InvoiceItemService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Invoice Items' })
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
  @ApiOperation({ summary: 'Crear Invoice Item de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      invoiceId: '123e4567-e89b-12d3-a456-426614174000',
      staffId: '123e4567-e89b-12d3-a456-426614174001',
      modelType: 'product',
      modelId: '123e4567-e89b-12d3-a456-426614174002',
      description: 'Producto de prueba',
      quantity: 2,
      unitPrice: 25.00,
      discount: 5.00,
      tax: 3.80,
      total: 43.80,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Invoice Items' })
  @Get()
  async findAll(@Query() params: FilterInvoiceItemDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Invoice Item' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Invoice Item' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateInvoiceItemDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Invoice Item' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateInvoiceItemDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Invoice Item' })
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