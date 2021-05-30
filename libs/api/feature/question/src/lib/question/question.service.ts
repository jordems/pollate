import { QuestionModelService } from '@deb8/api/data-access/question';
import {
  CreateQuestionRequest,
  CreateQuestionResponse,
  GetQuestionByStubResponse,
} from '@deb8/type';
import { Injectable, Logger } from '@nestjs/common';
import { nanoid } from 'nanoid';

@Injectable()
export class QuestionService {
  constructor(private readonly questionModelService: QuestionModelService) {}

  async create(
    userId: string,
    dto: CreateQuestionRequest
  ): Promise<CreateQuestionResponse> {
    return this.questionModelService.create({
      ...dto,
      stub: await this.generateStub(),
      userId,
    });
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
        exists = false;
      } catch {
        Logger.log('Please buy a lottery ticket!!!');
        exists = true;
      }
    } while (exists);

    return stub;
  }
}
