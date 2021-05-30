import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@pollate/api/shared/util/mongoose';
import { CreateMessageRequest } from '@pollate/type';
import { Length } from 'class-validator';

export class CreateMessageValidator implements CreateMessageRequest {
  @Length(1, 250)
  @ApiProperty({ description: 'Contents of message that will be sent' })
  text: string;
}

export class MessageParamsValidator {
  @IsObjectId()
  questionId: string;
}
