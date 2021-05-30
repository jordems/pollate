import { CreateQuestionRequest, Question } from '@deb8/type';
import { ArrayMaxSize, ArrayMinSize, Length } from 'class-validator';

export class CreateQuestionValidator implements CreateQuestionRequest {
  @Length(3, 150)
  question: string;

  @Length(1, 50, { each: true })
  @ArrayMinSize(2)
  @ArrayMaxSize(10)
  responses: string[];
}

export class GetQuestionByStubParamsValidator
  implements Pick<Question, 'stub'> {
  @Length(1, 30)
  stub: string;
}
