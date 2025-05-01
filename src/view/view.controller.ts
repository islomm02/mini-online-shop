import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ViewService } from './view.service';
import { CreateViewDto } from './dto/create-view.dto';
import { UpdateViewDto } from './dto/update-view.dto';

@Controller('view')
export class ViewController {
  constructor(private readonly viewService: ViewService) {}

  @Post()
  create(@Body() createViewDto: CreateViewDto) {
    return this.viewService.create(createViewDto);
  }

  @Get()
  get() {
    return this.viewService.findAll();
  }

  @Get()
  lastViewed() {
    return this.viewService.findAll();
  }

}
