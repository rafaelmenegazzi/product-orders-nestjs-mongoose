import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Res() res: Response,
  ) {
    const product = await this.productsService.create(createProductDto);
    return res.status(HttpStatus.CREATED).send(product);
  }

  @Get()
  async findAll(@Res() res: Response) {
    const products = await this.productsService.findAll();
    res.status(HttpStatus.OK).json(products);
  }

  @Get(':id')
  async findById(@Param('id') id: string, @Res() res: Response) {
    const product = await this.productsService.findById(id);
    res.status(HttpStatus.OK).json(product);
  }
}
