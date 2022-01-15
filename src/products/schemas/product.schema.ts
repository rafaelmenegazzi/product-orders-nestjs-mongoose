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
}

export const ProductSchema = SchemaFactory.createForClass(Product);
