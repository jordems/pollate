import { Injectable } from '@nestjs/common';
import { MessageModelService } from '@pollate/api/data-access/chat';
import { ResponseModelService } from '@pollate/api/data-access/response';
import {
  MinimalMessage,
  MinimalResponse,
  QuestionConnectedEvent,
  Response,
} from '@pollate/type';

@Injectable()
export class QuestionDataAccessService {
  constructor(
    private readonly messageModelService: MessageModelService,
    private readonly responseModelService: ResponseModelService
  ) {}

  /**
   * Fetches all information to be loaded on a `QuestionConnectedEvent`.
   *
   * The sub-methods take advantage of caching to support better scalability
   *
   * @param questionId - The ID of the question that is being connected to
   * @param userId - The ID of the user connecting to the question, null if anon
   */
  async fetchOnConnectedData(
    questionId: string,
    userId: string | null
  ): Promise<QuestionConnectedEvent | null> {
    const [messages, responses, userResponse] = await Promise.all([
      this.getMessages(questionId),
      this.getResponses(questionId),
      this.getUserResponse(questionId, userId),
    ]);

    return {
      messages,
      responses,
      userResponse,
    };
  }

  private async getMessages(questionId: string): Promise<MinimalMessage[]> {
    const messages = await this.messageModelService.findMessagesOnQuestion(
      questionId,
      { startId: null, limit: 50 }
    );

    return messages.map((message) => MessageModelService.toMinimal(message));
  }

  private async getResponses(questionId: string): Promise<MinimalResponse[]> {
    const responses = await this.responseModelService.findAllOnQuestion(
      questionId
    );

    return responses.map((response) =>
      ResponseModelService.toMinimal(response)
    );
  }

  private async getUserResponse(
    questionId: string,
    userId: string | null
  ): Promise<Response | null> {
    return userId
      ? await this.responseModelService.findUsersResponseOnQuestion(
          questionId,
          userId
        )
      : null;
  }
}
