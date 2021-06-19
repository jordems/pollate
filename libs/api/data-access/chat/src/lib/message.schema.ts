import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Message } from '@pollate/type';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const MESSAGE_MODEL_NAME = 'Message';

export type MessageDocument = MessageSchema & Document;

@Schema()
export class MessageSchema implements Omit<Message, '_id'> {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
    index: true,
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
 * ESR Index for message query made by the gateway onConnect Request
 */
messageSchema.index({ questionId: 1, createdAt: -1, _id: 1 });
