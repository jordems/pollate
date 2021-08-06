import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from '@pollate/type';
import { Document } from 'mongoose';

export const USER_MODEL_NAME = 'User';

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema implements Omit<User, '_id'> {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
