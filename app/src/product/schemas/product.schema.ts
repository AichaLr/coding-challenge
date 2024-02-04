import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';
import { Category } from '../enum';

@Schema({ timestamps: true, versionKey: false })
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  @Prop()
  description: string;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ type: String, enum: Category, default: Category.OTHER })
  category: Category;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Purchase' }] })
  purchases: Types.ObjectId[];

  @Prop({ default: null })
  deletedAt: Date;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
