import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { RoleEnum } from '../enums';
import mongoose from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class User {
  _id: mongoose.Types.ObjectId;

  @Prop({ required: true })
  email: string;

  @Prop({ select: false })
  password: string;

  @Prop({ required: false })
  username: string;

  @Prop({ type: String, enum: RoleEnum, default: RoleEnum.USER })
  role: RoleEnum;

  @Prop({ name: 'deleted_at', default: null })
  deletedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
