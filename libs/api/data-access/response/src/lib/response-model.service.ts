import { Response } from '@deb8/type/deb8';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model, ObjectId } from 'mongoose';
import { ResponseDocument, RESPONSE_MODEL_NAME } from './response.schema';

@Injectable()
export class ResponseModelService {
  constructor(
    @InjectModel(RESPONSE_MODEL_NAME)
    private model: Model<ResponseDocument, Response>
  ) {}

  static fromDocument(doc: ResponseDocument): Response {
    return pick(doc, ['_id', 'questionId', 'userId', 'response', 'createdAt']);
  }

  async create(
    response: Pick<Response, 'questionId' | 'userId' | 'response'>
  ): Promise<Response> {
    return ResponseModelService.fromDocument(await this.model.create(response));
  }

  async findAllOnQuestion(questionId: ObjectId): Promise<Response[]> {
    return (
      await this.model.find({
        questionId,
      })
    ).map((response) => ResponseModelService.fromDocument(response));
  }
}
