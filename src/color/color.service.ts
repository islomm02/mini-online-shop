import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';


@Injectable()
export class ColorService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateColorDto) {
    try {
      const color = await this.prisma.colors.create({ data });
      return color;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll(params: {
    search?: string;
    sortBy: string;
    sort: 'asc' | 'desc';
    page: number;
    limit: number;
  }) {
    try {
      const { search, sortBy, sort, page, limit } = params;
      const skip = (page - 1) * limit;

      const whereFilter = search
        ? {
            name: {
              contains: search,
              mode: Prisma.QueryMode.insensitive,
            },
          }
        : {};

      const [data, total] = await this.prisma.$transaction([
        this.prisma.colors.findMany({
          where: whereFilter,
          orderBy: {
            [sortBy]: sort,
          },
          skip,
          take: limit,
        }),
        this.prisma.colors.count({
          where: whereFilter,
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
    return `This action returns a #${id} color`;
  }

  update(id: number, updateColorDto: UpdateColorDto) {
    return `This action updates a #${id} color`;
  }

  remove(id: number) {
    return `This action removes a #${id} color`;
  }
}
