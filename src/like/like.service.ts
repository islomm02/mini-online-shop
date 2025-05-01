import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto, LikeIdDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class LikeService {
  constructor(private prisma: PrismaService, private product: ProductService) {}

  async create(data: CreateLikeDto) {
    try {
      let like = await this.prisma.likes.create({ data });

      let lll = await this.prisma.product.findFirst({ where: { id: data.productId } })
      let newCount = lll?.like ? lll.like + 1 : 1;
      console.log(newCount);
      await this.product.update(data.productId, {like: newCount})
      return like;
    } catch (error) {
      return { message: error.message };
    }
  }

  async findAll() {
    try {
      const likes = await this.prisma.likes.findMany();
      return likes;
    } catch (error) {
      return { message: error.mesasge };
    }
  }

  async liked(data: LikeIdDto) {
    let myLiked = await this.prisma.likes.findMany({
      where: { userId: data.userId },
    });
    if (!myLiked) {
      throw new NotFoundException('You has not liked any product yet');
    }
    return myLiked;
  }

  async remove(id: string) {
    let like = await this.prisma.likes.delete({ where: {id} });
    let lll = await this.prisma.product.findFirst({
      where: { id },
    });
    let newCount = lll?.like ? lll.like - 1 : 1;
    await this.product.update(id, { like: newCount });
    return like;
  }
}
