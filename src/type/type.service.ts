import { Injectable } from '@nestjs/common';
import { CreateTypeDto } from './dto/create-type.dto';
import { UpdateTypeDto } from './dto/update-type.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TypeService {
  constructor(private prisma : PrismaService){}
  async create(data: CreateTypeDto) {
    try {
      const type = await this.prisma.type.create({ data });
      return type;
    } catch (error) {
      return {message: error.message}
    }
  }

  async findAll() {
    try {
      const types = await this.prisma.type.findMany();
      return types;
    } catch (error) {
      return {message: error.message}
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} type`;
  }

  update(id: number, updateTypeDto: UpdateTypeDto) {
    return `This action updates a #${id} type`;
  }

  remove(id: number) {
    return `This action removes a #${id} type`;
  }
}
