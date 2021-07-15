import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  AuthParam,
  AuthParamsValidator,
  FirebaseAuthGuard,
} from '@pollate/api/shared/util/auth';
import {
  CreateQuestionResponse,
  GetQuestionByStubResponse,
} from '@pollate/type';
import { QuestionService } from './question.service';
import {
  CreateQuestionSwagger,
  GetQuestionByStubSwagger,
} from './question.swagger';
import {
  CreateQuestionValidator,
  GetQuestionByStubParamsValidator,
} from './question.validators';

@ApiTags('question')
@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @CreateQuestionSwagger()
  @UseGuards(FirebaseAuthGuard)
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
