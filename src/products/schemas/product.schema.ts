import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { nanoid } from 'nanoid';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({
    type: String,
    default: () => nanoid(),
  })
  _id: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  price: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
