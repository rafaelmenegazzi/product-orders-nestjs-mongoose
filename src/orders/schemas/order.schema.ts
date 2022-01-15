import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';

import { BaseEntity } from '../../database/base.entity';
import { Product } from '../../products/schemas/product.schema';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order extends BaseEntity {
  @Prop({ type: [{ type: String, ref: Product.name }] })
  @Type(() => Product)
  products: Product[];

  @Prop()
  customerName: string;
}

const OrderSchema = SchemaFactory.createForClass(Order);

export { OrderSchema };
