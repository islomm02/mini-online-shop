import { Module } from '@nestjs/common';
import { LikeService } from './like.service';
import { LikeController } from './like.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductService } from 'src/product/product.service';
import { ViewService } from 'src/view/view.service';

@Module({
  controllers: [LikeController],
  providers: [LikeService, PrismaService, ProductService, ViewService],
})
export class LikeModule {}
