import { Question } from '@deb8/type';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { QuestionDocument, QUESTION_MODEL_NAME } from './question.schema';

@Injectable()
export class QuestionModelService {
  constructor(
    @InjectModel(QUESTION_MODEL_NAME)
    private model: Model<QuestionDocument, Question>
  ) {}

  static fromDocument(doc: QuestionDocument): Question {
    return pick(doc, [
      '_id',
      'stub',
      'question',
      'responses',
      'userId',
      'createdAt',
    ]);
  }

  async create(
    question: Pick<Question, 'question' | 'responses' | 'stub' | 'userId'>
  ): Promise<Question> {
    return QuestionModelService.fromDocument(await this.model.create(question));
  }

  async findByStub(stub: string): Promise<Question> {
    const question = await this.model.findOne({
      stub,
    });

    if (!question) {
      throw new NotFoundException({ message: 'Question not found' });
    }

    return QuestionModelService.fromDocument(question);
  }
}
