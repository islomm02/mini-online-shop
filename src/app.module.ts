import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RegionModule } from './region/region.module';
import { ProductModule } from './product/product.module';
import { ColorModule } from './color/color.module';
import { CategoryModule } from './category/category.module';
import { TypeModule } from './type/type.module';
import { LikeModule } from './like/like.module';
import { ViewModule } from './view/view.module';
import { CommentsModule } from './comments/comments.module';
import { ChatModule } from './chat/chat.module';
import { OrderModule } from './order/order.module';
import { MulterModule } from './multer/multer.module';

@Module({
  imports: [AuthModule, PrismaModule, RegionModule, ProductModule, ColorModule, CategoryModule, TypeModule, LikeModule, ViewModule, CommentsModule, ChatModule, OrderModule, MulterModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
