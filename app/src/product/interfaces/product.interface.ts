import { Document } from 'mongoose';
import { Purchase } from '../../purchase/schemas/purchase.schema';
export interface IProduct extends Document {
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt: Date;
  readonly name: string;
  readonly price: number;
  readonly quantity: number;
  readonly isAvailable: boolean;
  readonly purchases: Purchase[];
}
