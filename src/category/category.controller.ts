import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { TokenGuard } from 'src/guards/token.guard';
import { UserRole } from '@prisma/client';
import { RoleD } from 'src/decorator/role-decorators';
import { RoleGuard } from 'src/guards/role.guard';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll(
    @Query('search') search?: string,
    @Query('sort') sort: 'asc' | 'desc' = 'asc',
    @Query('page') page = '1',
    @Query('limit') limit = '10',
  ) {
    return this.categoryService.findAll({
      search,
      sort,
      page: parseInt(page),
      limit: parseInt(limit),
    });
  }

  @RoleD(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
