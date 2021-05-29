import { IsObjectId } from '@deb8/api/shared/util/mongoose';
import { CreateMessageRequest } from '@deb8/type/deb8';
import { Length } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateMessageValidator implements CreateMessageRequest {
  @Length(1, 250)
  text: string;
}

export class MessageParamsValidator {
  @IsObjectId()
  questionId: ObjectId;
}
