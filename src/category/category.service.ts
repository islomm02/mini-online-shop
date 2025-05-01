import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService){}
  async create(data: CreateCategoryDto) {
    try {
      const ctg = await this.prisma.category.create({ data });
      return ctg;
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const ctgs = await this.prisma.category.findMany();
      return ctgs;
    } catch (error) {
      return {message: error.message}
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
