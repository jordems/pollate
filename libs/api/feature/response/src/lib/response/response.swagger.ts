import { Response } from '@deb8/type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';

export function CreateResponseSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Creates a users response on a question',
    }),
    ApiParam({
      name: 'questionId',
      description: 'Question that is being responded to',
    }),
    ApiCreatedResponse({
      type: ResponseEntity,
    })
  );
}

export function UpdateResponseSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Updates a users existing response on a question',
    }),
    ApiParam({
      name: 'questionId',
      description: 'Question that is being responded to',
    }),
    ApiParam({
      name: 'responseId',
      description: 'Response that is being updated',
    }),
    ApiOkResponse({
      type: ResponseEntity,
    })
  );
}

class ResponseEntity implements Response {
  @ApiProperty({ description: 'Generated unique id of response' })
  _id: string;

  @ApiProperty({ description: 'Question that response is on' })
  questionId: string;

  @ApiProperty({ description: 'ID of user who created response' })
  userId: string;

  @ApiProperty({ description: 'Text displayed for the response' })
  response: string;

  @ApiProperty({ description: 'Timestamp when the response was created' })
  createdAt: Date;
}
