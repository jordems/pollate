import { Message } from '@deb8/type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const MESSAGE_MODEL_NAME = 'Message';

export type MessageDocument = MessageSchema & Document;

@Schema()
export class MessageSchema implements Message {
  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  questionId: string;

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
