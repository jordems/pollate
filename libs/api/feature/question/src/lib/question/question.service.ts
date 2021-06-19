import { Injectable, Logger } from '@nestjs/common';
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
   */
  private static buildQuestion(
    dto: CreateQuestionRequest,
    stub: string,
    userId: string
  ): Omit<Question, 'createdAt'> {
    return {
      ...dto,
      stub,
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
    const stub = await this.generateStub();

    return this.questionModelService.create(
      QuestionService.buildQuestion(dto, stub, userId)
    );
  }

  getByStub(stub: string): Promise<GetQuestionByStubResponse> {
    return this.questionModelService.findByStub(stub);
  }

  /**
   * Generate a random stub to link to the question. If it's already used, create another.
   */
  private async generateStub(): Promise<string> {
    let exists: boolean;
    let stub: string;

    do {
      stub = nanoid(10);

      try {
        await this.questionModelService.findByStub(stub);
        exists = true;
      } catch {
        Logger.log('Please buy a lottery ticket!!!');
        exists = false;
      }
    } while (exists);

    return stub;
  }
}
