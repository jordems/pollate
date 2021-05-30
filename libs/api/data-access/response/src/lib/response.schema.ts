import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Response } from '@pollate/type';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const RESPONSE_MODEL_NAME = 'Response';

export type ResponseDocument = ResponseSchema & Document;

@Schema()
export class ResponseSchema implements Omit<Response, '_id'> {
  @Prop({
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  questionId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  response: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const responseSchema = SchemaFactory.createForClass(ResponseSchema);

responseSchema.index({questionId: 1, userId: 1});