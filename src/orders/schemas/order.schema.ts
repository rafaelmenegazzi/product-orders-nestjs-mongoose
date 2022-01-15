import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

import { BaseEntity } from '../../database/base.entity';

export type OrderDocument = Order & Document;

@Schema({ timestamps: true })
export class Order extends BaseEntity {}

export const OrderSchema = SchemaFactory.createForClass(Order);
