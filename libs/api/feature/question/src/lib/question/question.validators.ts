import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionRequest, Question } from '@pollate/type';
import { ArrayMaxSize, ArrayMinSize, Length } from 'class-validator';

export class CreateQuestionValidator implements CreateQuestionRequest {
  @Length(3, 150)
  @ApiProperty({ description: 'Question text that is displayed' })
  question: string;

  @Length(1, 50, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  @ApiProperty({
    description: 'List of possible responses to the question',
    type: [String],
  })
  responses: string[];
}

export class GetQuestionByStubParamsValidator
  implements Pick<Question, 'stub'> {
  @Length(1, 30)
  stub: string;
}
