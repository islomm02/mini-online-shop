import { Injectable } from '@nestjs/common';
import { CreateColorDto } from './dto/create-color.dto';
import { UpdateColorDto } from './dto/update-color.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ColorService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateColorDto) {
    try {
      const color = await this.prisma.colors.create({ data });
      return color;
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const colors = await this.prisma.colors.findMany();
      return colors;
    } catch (error) {
      return {message: error.message}
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
