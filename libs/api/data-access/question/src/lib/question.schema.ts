import { Question } from '@deb8/type/deb8';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document, ObjectId } from 'mongoose';

export const QUESTION_MODEL_NAME = 'Question';

export type QuestionDocument = QuestionSchema & Document;

@Schema()
export class QuestionSchema implements Question {
  @Prop({ index: true })
  _id: ObjectId;

  @Prop({ index: true, unique: true })
  stub: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  userId: ObjectId;

  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  responses: string[];

  @Prop({ default: new Date() })
  createdAt: Date;
}

export const questionSchema = SchemaFactory.createForClass(QuestionSchema);
