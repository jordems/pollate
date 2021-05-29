import { IsObjectId } from '@deb8/api/shared/util/mongoose';
import { CreateMessageRequest } from '@deb8/type';
import { Length } from 'class-validator';

export class CreateMessageValidator implements CreateMessageRequest {
  @Length(1, 250)
  text: string;
}

export class MessageParamsValidator {
  @IsObjectId()
  questionId: string;
}
