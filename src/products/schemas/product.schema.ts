import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseEntity } from '../../database/base.entity';

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product extends BaseEntity {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  sku: number;

  @Prop({ enum: ['IN_STOCK', 'SOLD'], default: 'IN_STOCK' })
  status: string;

  public sell() {
    if (this.status !== 'IN_STOCK') {
      throw new Error('Product no longer available');
    }
    this.status = 'SOLD';
  }
}

const ProductSchema = SchemaFactory.createForClass(Product);

ProductSchema.virtual('order', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'products',
});

export { ProductSchema };
