import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsDateString } from 'class-validator';
import { PaginationDto } from '@utils/pagination';

export class AppointmentFilterDto extends PaginationDto {
  @ApiPropertyOptional({ example: '2026-01-14' })
  @IsOptional()
  @IsDateString()
  startDate?: string;

  @ApiPropertyOptional({ example: '2026-01-20' })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}
