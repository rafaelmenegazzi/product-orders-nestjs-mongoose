import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';

import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto, @Res() res: Response) {
    const order = await this.ordersService.create(createOrderDto);
    return res.status(HttpStatus.CREATED).send(order);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const orders = await this.ordersService.findAll();
    res.status(HttpStatus.OK).json(orders);
  }
}
