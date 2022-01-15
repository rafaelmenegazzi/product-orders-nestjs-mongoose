import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';

import { ProductsService } from '../products/products.service';
import { Order, OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    private productsService: ProductsService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const products = await this.productsService.findByIds(
      createOrderDto.productIds,
    );
    const createdOrder = new this.orderModel({
      customerName: createOrderDto.customerName,
      products,
    });
    return createdOrder.save();
  }

  async findAll(): Promise<Order[]> {
    const orders = await this.orderModel.find().populate('products');
    return orders.map((o) => plainToClass(Order, o.toJSON()));
  }
}
