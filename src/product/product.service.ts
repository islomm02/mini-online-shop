import { Injectable, NotFoundException, Req, UseGuards } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { TokenGuard } from 'src/guards/token.guard';
import { ViewService } from 'src/view/view.service';

interface ProductFilterOptions {
  search?: string;
  categoryId?: string;
  colorId?: string;
  xolati?: string;
  priceFrom?: number;
  priceTo?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  page?: number;
  limit?: number;
}

@Injectable()
export class ProductService {
  constructor(
    private prisma: PrismaService,
    private viewService: ViewService,
  ) {}

  @UseGuards(TokenGuard)
  async create(data: CreateProductDto, user) {
    try {
      console.log(user);

      const newPrd = await this.prisma.product.create({
        data: { ...data, ownerId: user.id },
      });
      return newPrd;
    } catch (error) {
      return { message: error.message };
    }
  }

  

async findAll(options: ProductFilterOptions) {
  const {
    search,
    categoryId,
    colorId,
    xolati,
    priceFrom,
    priceTo,
    sortBy = 'createdAt',
    sortOrder = 'desc',
    page = 1,
    limit = 10,
  } = options;

  const where: any = {};

  if (search) {
    where.name = { contains: search, mode: 'insensitive' };
  }
  if (categoryId) where.categoryId = categoryId;
  if (colorId) where.colorId = colorId;
  if (xolati) where.xolati = xolati;
  if (priceFrom || priceTo) {
    where.price = {};
    if (priceFrom) where.price.gte = priceFrom;
    if (priceTo) where.price.lte = priceTo;
  }

  const skip = (page - 1) * limit;

  try {
    const [data, total] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        where,
        orderBy: { [sortBy]: sortOrder },
        skip,
        take: limit,
      }),
      this.prisma.product.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    return { message: error.message };
  }
}


  async myProducts(ownerId: string) {
    try {
      const data = await this.prisma.product.findMany({ where: { ownerId } });
      return data;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findOne(id: string, user) {
    try {
      const one = await this.prisma.product.findFirst({
        where: { id },
        include: {
          category: true,
          color: true,
          type: true,
          owner: true,
        },
      });
      if (!one) {
        throw new NotFoundException('Product Not found');
      }
      let views = await this.viewService.checkView(one.id, user.id);
      if (!views) {
        await this.viewService.create({ userId: user.id, productId: one.id });
      }
      return one;
    } catch (error) {
      return { message: error.message };
    }
  }

  async update(id: string, data: UpdateProductDto) {
    try {
      const updated = await this.prisma.product.update({ where: { id }, data });
      return updated;
    } catch (error) {
      return { message: error.message };
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.product.delete({ where: { id } });
      return deleted;
    } catch (error) {
      return { message: error.message };
    }
  }
}
