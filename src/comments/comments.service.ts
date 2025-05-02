import { Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCommentDto, user) {
    const comment = await this.prisma.comments.create({ data : {...data, userId: user.id}});

    const productCommentsCount = await this.prisma.comments.count({
      where: { productId: data.productId },
    });

    const comments = await this.prisma.comments.findMany({
      where: { productId: data.productId },
      select: { star: true },
    });

    const totalStars = comments.reduce((sum, c) => sum + c.star, 0);

    const overallStar = totalStars / productCommentsCount;

    await this.prisma.product.update({
      where: { id: data.productId },
      data: { star: overallStar },
    });

    return comment;
  }

  async findAll() {
    try {
      const data = await this.prisma.comments.findMany();
      return data;
    } catch (error) {
      console.log(error);
      return {message: error.message}
    }
  }

  async findOne(id: string) {
    try {
      const data = await this.prisma.comments.findFirst({ where: { id } });
      return data;
    } catch (error) {
      console.log();
      return {message: error.message}
    }
  }

  async remove(id: string) {
    try {
      const data = await this.prisma.comments.delete({ where: { id } });
      return data;
    } catch (error) {
      console.log(error);
      return {message: error.message}
    }
  }
}
