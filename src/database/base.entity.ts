import { Prop } from '@nestjs/mongoose';
import { nanoid } from 'nanoid';

export abstract class BaseEntity {
  @Prop({
    type: String,
    default: () => nanoid(),
  })
  _id: string;
}
