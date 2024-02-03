import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { SchemaTypes, Types } from 'mongoose';
import { Category } from '../enum';

//@Schema({ timestamps: true, versionKey: false })
//export class Image {
// @Prop({ required: true })
// url: string;

// @Prop({ required: true })
//  altText: string;
//}

@Schema({ timestamps: true, versionKey: false })
export class Product {
  _id: mongoose.Types.ObjectId;

  @Prop()
  name: string;

  //  @Prop({ type: Image })
  //image?: string;

  @Prop()
  price: number;

  @Prop({ default: 0 })
  quantity: number;

  @Prop({ default: true })
  isAvailable: boolean;

  @Prop({ type: [{ type: SchemaTypes.ObjectId, ref: 'Purchase' }] })
  purchases: Types.ObjectId[];

  @Prop({ default: null })
  deletedAt: Date;

  @Prop({ type: String, enum: Category, default: Category.OTHER })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
