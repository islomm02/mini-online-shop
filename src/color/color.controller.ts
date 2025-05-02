import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ColorService } from './color.service';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { UserRole } from '@prisma/client';
import { RoleD } from 'src/decorator/role-decorators';

@Controller('color')
export class ColorController {
  constructor(private readonly colorService: ColorService) {}

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createColorDto: CreateColorDto) {
    return this.colorService.create(createColorDto);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sortBy') sortBy: string = 'name',
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.colorService.findAll({
      search,
      sortBy,
      sort,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.colorService.findOne(+id);
  }

  @RoleD(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateColorDto: UpdateColorDto) {
    return this.colorService.update(+id, updateColorDto);
  }

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.colorService.remove(+id);
  }
}
