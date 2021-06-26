import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from '@pollate/type';
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
    return {
      ...pick(doc, [
        'stub',
        'question',
        'responses',
        'userId',
        'createdAt',
        'memoized',
      ]),
      _id: doc._id,
    };
  }

  private static buildActiveResponseKey(response: string): string {
    return `memoized.activeResponses.${response}`;
  }

  async create(
    question: Pick<
      Question,
      'question' | 'responses' | 'stub' | 'userId' | 'memoized'
    >
  ): Promise<Question> {
    return QuestionModelService.fromDocument(await this.model.create(question));
  }

  async findById(id: string): Promise<Question> {
    const question = await this.model.findById(id);

    if (!question) {
      throw new NotFoundException({ message: 'Question not found' });
    }

    return QuestionModelService.fromDocument(question);
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

  async incrementMessageCount(questionId: string): Promise<void> {
    await this.model.updateOne(
      { _id: questionId },
      { $inc: { 'memoized.messageCount': 1 } }
    );
  }

  async incrementResponseCount(
    questionId: string,
    response: string
  ): Promise<void> {
    await this.model.updateOne(
      { _id: questionId },
      {
        $inc: {
          'memoized.responseCount': 1,
          [QuestionModelService.buildActiveResponseKey(response)]: 1,
        },
      }
    );
  }

  async changeResponseCount(
    questionId: string,
    oldResponse: string,
    newResponse: string
  ): Promise<void> {
    if (oldResponse === newResponse) {
      return;
    }

    await this.model.updateOne(
      { _id: questionId },
      {
        $inc: {
          [QuestionModelService.buildActiveResponseKey(oldResponse)]: -1,
          [QuestionModelService.buildActiveResponseKey(newResponse)]: 1,
        },
      }
    );
  }
}
