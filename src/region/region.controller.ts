import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RegionService } from './region.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { UserRole } from '@prisma/client';
import { RoleD } from 'src/decorator/role-decorators';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('region')
export class RegionController {
  constructor(private readonly regionService: RegionService) {}

  // @RoleD(UserRole.ADMIN)
  // @UseGuards(RoleGuard)
  // @UseGuards(TokenGuard)
  @Post()
  create(@Body() createRegionDto: CreateRegionDto) {
    return this.regionService.create(createRegionDto);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.regionService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.regionService.findOne(+id);
  }

  @RoleD(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRegionDto: UpdateRegionDto) {
    return this.regionService.update(+id, updateRegionDto);
  }

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.regionService.remove(+id);
  }
}
