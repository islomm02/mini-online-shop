import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.create(createViewDto);
  }

  @UseGuards(TokenGuard)
  @Get()
  get() {
    return this.viewService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get('last-views')
  lastViewed() {
    return this.viewService.lastViews();
  }
}
