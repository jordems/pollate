import { User } from '@deb8/type/deb8';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export const USER_MODEL_NAME = 'User';

export type UserDocument = UserSchema & Document;

@Schema()
export class UserSchema implements User {
  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;

  @Prop({ unique: true, index: true })
  uid: string;

  @Prop({ required: true })
  name: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const userSchema = SchemaFactory.createForClass(UserSchema);
