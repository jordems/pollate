import { Message } from '@deb8/type/deb8';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export const MESSAGE_MODEL_NAME = 'Message';

export type MessageDocument = MessageSchema & Document;

@Schema()
export class MessageSchema implements Message {
  @Prop({ index: true })
  _id: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  userId: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  questionId: ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  text: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const messageSchema = SchemaFactory.createForClass(MessageSchema);

/**
 * ESR Index for message query
 */
messageSchema.index({ questionId: 1, createdAt: -1, _id: 1 });
