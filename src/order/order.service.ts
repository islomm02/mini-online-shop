import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class OrderService {

  constructor(private prisma: PrismaService){}

  async create(data: CreateOrderDto, user) {
    let prd = await this.prisma.product.findFirst({ where: { id: data.productId } })
    if (!prd) {
      throw new NotFoundException("Product Not found")
    }
    if (prd.count < data.count) {
      return {message: "Not enought product"}
    }
    let asd = prd.count - data.count
    const oerder  = await this.prisma.orders.create({data: {...data, userId: user.id}})
    await this.prisma.product.update({where: {id: data.productId}, data: {count: asd}})
    return {message: "You have ordered successfully", oerder}
  }

  async findAll() {
    let data = await this.prisma.orders.findMany()
    return data
  }

  async findMyOrders(user) {
    let data = await this.prisma.orders.findMany({where: {userId: user.id}})
    return data
  }

  async findOne(id: string) {
    let data = await this.prisma.orders.findFirst({where: {id}})
    return data
  }

  async update(id: string, data: UpdateOrderDto) {
    let one = await this.findOne(id) 
    if(!one){
      throw new NotFoundException("Order not found")
    }
    let updated = await this.prisma.orders.update({ where: { id }, data })
    return updated
  }

  async remove(id: string) {
    let one = await this.findOne(id)
    if (!one) {
      throw new NotFoundException("Order not ofund")
    }
    await this.prisma.orders.delete({where: {id}})
    return {message: "Order deleted succesfully"}
  }
}
