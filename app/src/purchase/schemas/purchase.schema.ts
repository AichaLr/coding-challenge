import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Purchase {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'Product' })
  product: Types.ObjectId;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  user: Types.ObjectId;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
