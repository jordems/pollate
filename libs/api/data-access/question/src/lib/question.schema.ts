import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { MemoizedQuestionData, Question } from '@pollate/type';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export const QUESTION_MODEL_NAME = 'Question';

export type QuestionDocument = QuestionSchema & Document;

@Schema({ _id: false })
export class MemoizedQuestionDataSchema implements MemoizedQuestionData {
  @Prop({ default: 0 })
  responseCount: number;

  @Prop({ default: 0 })
  messageCount: number;

  @Prop({ type: mongoose.Schema.Types.Mixed })
  activeResponses: { [response: string]: number };
}

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

  @Prop({ type: MemoizedQuestionDataSchema })
  memoized: MemoizedQuestionData;
}

export const questionSchema = SchemaFactory.createForClass(QuestionSchema);
