import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { Message } from '@pollate/type';

export function CreateMessageSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Creates a message on the specified question.',
    }),
    ApiParam({
      name: 'questionId',
      description: 'The question that this message is to be created under',
    }),
    ApiCreatedResponse({
      type: MessageEntity,
    })
  );
}

class MessageEntity implements Message {
  @ApiProperty({ description: 'Generated unique id of message' })
  _id: string;

  @ApiProperty({ description: 'ID of user who created message' })
  userId: string;

  @ApiProperty({ description: 'Question the message was created under' })
  questionId: string;

  @ApiProperty({ description: 'Name of the user who created the message' })
  name: string;

  @ApiProperty({ description: 'Contents of message' })
  text: string;

  @ApiProperty({ description: 'Timestamp when the message was created' })
  createdAt: Date;
}
