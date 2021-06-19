import { Injectable } from '@nestjs/common';
import { QuestionModelService } from '@pollate/api/data-access/question';
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetQuestionByStubResponse,
  Question,
} from '@pollate/type';
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
  constructor(private readonly questionModelService: QuestionModelService) {}

  /**
   * Builds the base question data that exists on a question when first created.
   *
   * - Organizes starting memoized data
   * - Creates a unique stub
   * TODO Make custom stubs and check if already exists
   */
  private static buildQuestion(
    dto: CreateQuestionRequest,
    userId: string
  ): Omit<Question, 'createdAt'> {
    return {
      ...dto,
      stub: nanoid(10),
      userId,
      memoized: {
        responseCount: 0,
        messageCount: 0,
        activeResponses: dto.responses.reduce(
          (map, response) => ({ ...map, [response]: 0 }),
          {}
        ),
      },
    };
  }

  /**
   * Creates a question for the user
   *
   * - Generates a new stub
   * - builds the starting memoized question data
   */
  async create(
    userId: string,
    dto: CreateQuestionRequest
  ): Promise<CreateQuestionResponse> {
    return this.questionModelService.create(
      QuestionService.buildQuestion(dto, userId)
    );
  }

  getByStub(stub: string): Promise<GetQuestionByStubResponse> {
    return this.questionModelService.findByStub(stub);
  }
}
