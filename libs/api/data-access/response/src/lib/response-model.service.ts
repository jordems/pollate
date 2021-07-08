import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { MinimalResponse, Response } from '@pollate/type';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { ResponseDocument, RESPONSE_MODEL_NAME } from './response.schema';

@Injectable()
export class ResponseModelService {
  constructor(
    @InjectModel(RESPONSE_MODEL_NAME)
    private model: Model<ResponseDocument, Response>
  ) {}

  static fromDocument(doc: ResponseDocument): Response {
    return {
      ...pick(doc, ['questionId', 'userId', 'response', 'createdAt']),
      _id: doc._id,
    };
  }

  static toMinimal<T extends Response>(response: T): MinimalResponse {
    return pick(response, ['_id', 'userId', 'response', 'createdAt']);
  }

  async create(
    response: Pick<Response, 'questionId' | 'userId' | 'response'>
  ): Promise<Response> {
    return ResponseModelService.fromDocument(await this.model.create(response));
  }

  async update(
    id: string,
    response: Pick<Response, 'response'>
  ): Promise<Response> {
    return ResponseModelService.fromDocument(
      await this.model.findByIdAndUpdate(id, { $set: response }, { new: true })
    );
  }

  async findOneRequired(id: string): Promise<Response> {
    const response = await this.model.findById(id);

    if (!response) {
      throw new BadRequestException('Response ID given does not exist');
    }

    return ResponseModelService.fromDocument(response);
  }

  async findAllOnQuestion(questionId: string): Promise<Response[]> {
    return (
      await this.model.find({
        questionId,
      })
    ).map((response) => ResponseModelService.fromDocument(response));
  }

  async findUsersResponseOnQuestion(
    questionId: string,
    userId: string
  ): Promise<Response | null> {
    const response = await this.model.findOne({ questionId, userId });

    if (!response) {
      return null;
    }

    return ResponseModelService.fromDocument(response);
  }
}
