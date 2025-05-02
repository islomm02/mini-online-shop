import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, LikeIdDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto) {
    return this.likeService.create(createLikeDto);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get()
  mys(@Body() data: LikeIdDto) {
    return this.likeService.liked(data);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(id);
  }
}
