import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { TokenGuard } from 'src/guards/token.guard';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(TokenGuard)
  @Post()
  create(@Body() createOrderDto: CreateOrderDto, @Request() req) {
    return this.orderService.create(createOrderDto, req.user);
  }
  @UseGuards(TokenGuard)
  @Get()
  findAll() {
    return this.orderService.findAll();
  }
  @UseGuards(TokenGuard)
  @Get("my-orders")
  findMyOrders(@Request() req) {
    return this.orderService.findMyOrders(req.user);
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(id);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(id);
  }
}
