import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { LikeService } from './like.service';
import { CreateLikeDto, LikeIdDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createLikeDto: CreateLikeDto, @Request() req) {
    return this.likeService.create(createLikeDto, req.user);
  }

  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.likeService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('liked')
  mys(@Request() req) {
    return this.likeService.liked(req.user);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.likeService.remove(id);
  }
}
