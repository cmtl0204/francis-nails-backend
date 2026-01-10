import { PartialType } from '@nestjs/swagger';
import { BaseBranchDto } from './base-branch.dto';

export class UpdateBranchDto extends PartialType(BaseBranchDto) {}
