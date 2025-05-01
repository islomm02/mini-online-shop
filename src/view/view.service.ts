import { Injectable } from '@nestjs/common';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { subDays } from 'date-fns';

@Injectable()
export class ViewService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateViewDto) {
    try {
      const asd = await this.prisma.views.create({ data });
      return asd;
    } catch (error) {
      return {message: error.message}
    }
  }
  
  async findAll() {
    let datas = await this.prisma.views.findMany()
    return datas
  }
  
  async lastViews() {
    const oneDayAgo = subDays(new Date(), 1);
    let datas = await this.prisma.views.findMany({where: {createdAt: {gte: oneDayAgo}}})
    return datas
  }
  
  async checkView(prdId: string, userId: string) {
    const asd = await this.prisma.views.findMany({where: {userId, productId: prdId} });
    return asd;
  }

}
