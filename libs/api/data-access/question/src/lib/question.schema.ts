import { Question } from '@deb8/type';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const QUESTION_MODEL_NAME = 'Question';

export type QuestionDocument = QuestionSchema & Document;

@Schema()
export class QuestionSchema implements Omit<Question, '_id'> {
  @Prop({ index: true, unique: true })
  stub: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  responses: string[];

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const questionSchema = SchemaFactory.createForClass(QuestionSchema);
