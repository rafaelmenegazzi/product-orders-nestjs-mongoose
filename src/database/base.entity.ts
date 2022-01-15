import { Prop } from '@nestjs/mongoose';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdef', 10);

export abstract class BaseEntity {
  @Prop({
    type: String,
    default: () => nanoid(),
  })
  _id: string;
}
