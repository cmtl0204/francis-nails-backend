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
import { ResponseHttpInterface } from '@utils/interfaces';
import { CadastreService } from '@modules/core/roles/external/services/cadastre.service';
import { CreateCadastreDto } from '@modules/core/roles/external/dto/cadastre';
import { PaginationDto } from '@utils/dto';
import { AdminService } from '../services';



@ApiTags('Admin Product')
@Controller('core/admin/products')
export class AdminController {

constructor(private service: AdminService) {}

  @Get('mi_ruta')
  getBaseRoute() {
    return { message: 'Admin funcionando' };
  }

}
