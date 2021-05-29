import { Response } from '@deb8/type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const RESPONSE_MODEL_NAME = 'Response';

export type ResponseDocument = ResponseSchema & Document;

@Schema()
export class ResponseSchema implements Response {
  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  _id: string;

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
