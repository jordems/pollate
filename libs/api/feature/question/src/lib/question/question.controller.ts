import { AuthParam, AuthParamsValidator } from '@deb8/api/shared/util/auth';
import { CreateQuestionResponse, GetQuestionByStubResponse } from '@deb8/type';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { QuestionService } from './question.service';
import {
  CreateQuestionSwagger,
  GetQuestionByStubSwagger,
} from './question.swagger';
import {
  CreateQuestionValidator,
  GetQuestionByStubParamsValidator,
} from './question.validators';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @CreateQuestionSwagger()
  create(
    @AuthParam() { userId }: AuthParamsValidator,
    @Body() dto: CreateQuestionValidator
  ): Promise<CreateQuestionResponse> {
    return this.questionService.create(userId, dto);
  }

  @Get('stub/:stub')
  @GetQuestionByStubSwagger()
  getByStub(
    @Param() { stub }: GetQuestionByStubParamsValidator
  ): Promise<GetQuestionByStubResponse> {
    return this.questionService.getByStub(stub);
  }
}
