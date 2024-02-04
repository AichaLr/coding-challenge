import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Category } from 'app/src/product/enum';
import mongoose, { SchemaTypes, Types } from 'mongoose';

interface Product {
  _id: Types.ObjectId;
  name: string;
  price: number;
  category: Category;
}

@Schema({ timestamps: true, versionKey: false })
export class Purchase {
  _id: mongoose.Types.ObjectId;

  @Prop({ type: Object })
  product: Product;

  @Prop({ default: Date.now })
  date: Date;

  @Prop({ type: SchemaTypes.ObjectId, ref: 'User' })
  purchasedBy: Types.ObjectId;
}

export const PurchaseSchema = SchemaFactory.createForClass(Purchase);
