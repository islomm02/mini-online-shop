import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { ProductXolati, UserRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';
import { ApiQuery } from '@nestjs/swagger';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto, @Request() req) {
    let user = req.user;

    return this.productService.create(createProductDto, user);
  }

  @UseGuards(TokenGuard)
  @Get()
  @ApiQuery({ name: 'search', required: false })
  @ApiQuery({ name: 'categoryId', required: false })
  @ApiQuery({ name: 'colorId', required: false })
  @ApiQuery({ name: 'xolati', required: false, enum: ProductXolati })
  @ApiQuery({ name: 'priceFrom', required: false, type: Number })
  @ApiQuery({ name: 'priceTo', required: false, type: Number })
  @ApiQuery({
    name: 'sortBy',
    required: false,
    enum: ['name', 'price', 'createdAt'],
  })
  @ApiQuery({ name: 'sortOrder', required: false, enum: ['asc', 'desc'] })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(
    @Query('search') search?: string,
    @Query('categoryId') categoryId?: string,
    @Query('colorId') colorId?: string,
    @Query('xolati') xolati?: ProductXolati,
    @Query('priceFrom') priceFrom?: number,
    @Query('priceTo') priceTo?: number,
    @Query('sortBy') sortBy?: string,
    @Query('sortOrder') sortOrder?: 'asc' | 'desc',
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return this.productService.findAll({
      search,
      categoryId,
      colorId,
      xolati,
      priceFrom,
      priceTo,
      sortBy,
      sortOrder,
      page,
      limit,
    });
  }

  @UseGuards(TokenGuard)
  @Get('my-products')
  myProducts(@Request() req) {
    let user = req.user;
    return this.productService.myProducts(user.id);
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    let user = req.user;
    return this.productService.findOne(id, user);
  }

  @RoleD(UserRole.ADMIN, UserRole.SUPER_ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @RoleD(UserRole.ADMIN)
  @UseGuards(RoleGuard)
  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
