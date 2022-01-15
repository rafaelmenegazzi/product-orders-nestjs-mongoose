import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { plainToClass } from 'class-transformer';
import { Model } from 'mongoose';

import { Product, ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
  ) {}

  opts = { runValidators: true };

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async findAll(): Promise<Product[]> {
    const products = await this.productModel.find().populate('order').lean();
    return products.map((p) => plainToClass(Product, p));
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('order')
      .lean();
    return plainToClass(Product, product);
  }

  async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.productModel
      .find({
        _id: { $in: ids },
      })
      .lean();
    return products.map((p) => plainToClass(Product, p));
  }

  async sell(productIds: string[]): Promise<Product[]> {
    const products = await this.findByIds(productIds);
    products.forEach((p) => p.sell());
    await Promise.all(
      products.map((p) =>
        this.productModel.findByIdAndUpdate(p._id, p, this.opts),
      ),
    );
    return products;
  }
}
