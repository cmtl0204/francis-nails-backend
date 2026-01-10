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
import { ProductService } from '../services/product.service';
import {
  CreateProductDto,
  UpdateProductDto,
  FilterProductDto,
} from '../dto/product';

@ApiTags('External Products')
@Auth()
@Controller('core/external/product')
export class ProductController {
  constructor(private service: ProductService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'Endpoint de prueba para Products' })
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
  @ApiOperation({ summary: 'Crear Product de prueba' })
  @Post('/rutas')
  async createdRuta() {
    const payload = {
      branchId: '123e4567',
      categoryId: '123e4567',
      sku: 'PROD-001',
      name: 'Producto de prueba',
      description: 'Descripción del producto',
      unit: 'unidad',
      costPrice: 10.50,
      salePrice: 25.00,
      trackStock: true,
    };
    const serviceResponse = await this.service.createdRuta1(payload);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'List all Products' })
  @Get()
  async findAll(@Query() params: FilterProductDto) {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      message: 'Registros Consultados',
      title: 'Consultados',
    };
  }

  @ApiOperation({ summary: 'Get one Product' })
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: 'Registro Consultado',
      title: 'Consultado',
    };
  }

  @ApiOperation({ summary: 'Create Product' })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() payload: CreateProductDto) {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Creado',
      title: 'Creado',
    };
  }

  @ApiOperation({ summary: 'Update Product' })
  @Put(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: UpdateProductDto,
  ) {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: 'Registro Actualizado',
      title: 'Actualizado',
    };
  }

  @ApiOperation({ summary: 'Delete Product' })
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