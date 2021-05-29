import { Response } from '@deb8/type/deb8';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export const RESPONSE_MODEL_NAME = 'Response';

export type ResponseDocument = ResponseSchema & Document;

@Schema()
export class ResponseSchema implements Response {
  @Prop({ index: true, type: mongoose.Schema.Types.ObjectId })
  _id: ObjectId;

  @Prop({
    index: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
    required: true,
  })
  questionId: ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ required: true })
  response: string;

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const responseSchema = SchemaFactory.createForClass(ResponseSchema);
