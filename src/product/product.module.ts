import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ViewService } from 'src/view/view.service';
import { ViewModule } from 'src/view/view.module';

@Module({
  imports: [ViewModule],
  controllers: [ProductController],
  providers: [ProductService, PrismaService, ViewService],
})
export class ProductModule {}
