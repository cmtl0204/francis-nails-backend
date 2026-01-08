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
import { PublicRoute } from '@auth/decorators';
import { ResponseHttpInterface } from '@utils/interfaces';
import { CadastreService } from '@modules/core/roles/external/services/cadastre.service';
import { CreateCadastreDto } from '@modules/core/roles/external/dto/cadastre';
import { PaginationDto } from '@utils/dto';

@ApiTags('External Cadastre Ruta1')
@Controller('core/external/cadastres')
export class CadastreController {
  constructor(private readonly service: CadastreService) {}

  @PublicRoute()
  @ApiOperation({ summary: 'List all Ruta 1' })
  @Get('rutas')
  ruta1() {
    const serviceResponse = this.service.findRuta1();

    return {
      data: serviceResponse.data,
      message: `Registros Consultados`,
      title: `Consultados`,
    };
  }

  @PublicRoute()
  @ApiOperation({ summary: 'List all Ruta 1' })
  @Post('rutas')
  createRuta1() {
    const serviceResponse = this.service.createdRuta({ name: 'juan', phone: '123' });

    return {
      data: serviceResponse.data,
      message: `Registros Consultados`,
      title: `Consultados`,
    };
  }

  @ApiOperation({ summary: 'List all Cadastres' })
  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Query() params: PaginationDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findAll(params);

    return {
      data: serviceResponse.data,
      pagination: serviceResponse.pagination,
      message: `Registros Consultados`,
      title: `Consultados`,
    };
  }

  @ApiOperation({ summary: 'Delete Cadastre' })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.findOne(id);

    return {
      data: serviceResponse.data,
      message: `Registro Consultado`,
      title: `Consultado`,
    };
  }

  @ApiOperation({ summary: 'Create Cadastre' })
  @Post()
  @HttpCode(HttpStatus.OK)
  async create(@Body() payload: CreateCadastreDto): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.create(payload);

    return {
      data: serviceResponse.data,
      message: `Registro Creado`,
      title: `Creado`,
    };
  }

  @ApiOperation({ summary: 'Update Cadastre' })
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() payload: CreateCadastreDto,
  ): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.update(id, payload);

    return {
      data: serviceResponse.data,
      message: `Registro Actualizado`,
      title: `Actualizado`,
    };
  }

  @ApiOperation({ summary: 'Delete Cadastre' })
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  async remove(@Param('id', ParseUUIDPipe) id: string): Promise<ResponseHttpInterface> {
    const serviceResponse = await this.service.remove(id);

    return {
      data: serviceResponse.data,
      message: `Registro Eliminado`,
      title: `Eliminado`,
    };
  }
}
