import { Question } from '@deb8/type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';

export function CreateQuestionSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Creates a question with set responses',
    }),
    ApiCreatedResponse({
      type: QuestionEntity,
    }),
    ApiHeader({
      name: 'x-user-id',
      description: 'User creating request',
    })
  );
}

export function GetQuestionByStubSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Gets a question from its stub',
    }),
    ApiParam({
      name: 'stub',
      description: 'The stub to get the question',
    }),
    ApiOkResponse({
      type: QuestionEntity,
    })
  );
}

class QuestionEntity implements Question {
  @ApiProperty({ description: 'Generated unique id of question' })
  _id: string;

  @ApiProperty({ description: 'ID of user who created question' })
  userId: string;

  @ApiProperty({ description: 'Unique postfix of url to get to question' })
  stub: string;

  @ApiProperty({ description: 'Text displayed for the question' })
  question: string;

  @ApiProperty({
    description: 'List of responses that can answer the question',
    type: [String],
  })
  responses: string[];

  @ApiProperty({ description: 'Timestamp when the question was created' })
  createdAt: Date;
}
