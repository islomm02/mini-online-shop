import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { RoleD } from 'src/decorator/role-decorators';
import { UserRole } from '@prisma/client';
import { RoleGuard } from 'src/guards/role.guard';
import { TokenGuard } from 'src/guards/token.guard';

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
  findAll() {
    return this.productService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get("my-products")
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

  @UseGuards(TokenGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(id, updateProductDto);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(id);
  }
}
