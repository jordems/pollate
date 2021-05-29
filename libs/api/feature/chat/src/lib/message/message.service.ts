import { CreateMessageRequest } from '@deb8/type/deb8';
import { Injectable, NotImplementedException } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Injectable()
export class MessageService {
  create(questionId: ObjectId, userId: ObjectId, dto: CreateMessageRequest) {
    throw new NotImplementedException();
  }
}
