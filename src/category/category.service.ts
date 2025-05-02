import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto) {
    try {
      const ctg = await this.prisma.category.create({ data });
      return ctg;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll(params: {
    search?: string;
    sort?: 'asc' | 'desc';
    page: number;
    limit: number;
  }) {
    try {
      const { search, sort, page, limit } = params;
      const skip = (page - 1) * limit;

      const [data, total] = await this.prisma.$transaction([
        this.prisma.category.findMany({
          where: search
            ? {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
          orderBy: {
            name: sort,
          },
          skip,
          take: limit,
        }),
        this.prisma.category.count({
          where: search
            ? {
                name: {
                  contains: search,
                  mode: 'insensitive',
                },
              }
            : {},
        }),
      ]);

      return {
        total,
        page,
        limit,
        data,
      };
    } catch (error) {
      return { message: error.message };
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
