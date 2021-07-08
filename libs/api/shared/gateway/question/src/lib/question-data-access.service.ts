import { Injectable } from '@nestjs/common';
import { MessageModelService } from '@pollate/api/data-access/chat';
import { QuestionModelService } from '@pollate/api/data-access/question';
import { ResponseModelService } from '@pollate/api/data-access/response';
import {
  MemoizedQuestionData,
  MinimalMessage,
  QuestionConnectedEvent,
  Response,
} from '@pollate/type';

@Injectable()
export class QuestionDataAccessService {
  constructor(
    private readonly messageModelService: MessageModelService,
    private readonly responseModelService: ResponseModelService,
    private readonly questionModelService: QuestionModelService
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
    const [
      messages,
      memoizedQuestionData,
      userResponse,
      userInteractionMap,
    ] = await Promise.all([
      this.getMessages(questionId),
      this.getMemoizedQuestionData(questionId),
      this.getUserResponse(questionId, userId),
      this.getUserInteractionMap(questionId),
    ]);

    return {
      messages,
      memoizedQuestionData,
      userResponse,
      userInteractionMap,
    };
  }

  private async getMessages(questionId: string): Promise<MinimalMessage[]> {
    const messages = await this.messageModelService.findMessagesOnQuestion(
      questionId,
      { startId: null, limit: 50 }
    );

    return messages.map((message) => MessageModelService.toMinimal(message));
  }

  private async getMemoizedQuestionData(
    questionId: string
  ): Promise<MemoizedQuestionData> {
    const { memoized } = await this.questionModelService.findById(questionId);

    return memoized;
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

  private async getUserInteractionMap(
    questionId: string
  ): Promise<QuestionConnectedEvent['userInteractionMap']> {
    const responses = await this.responseModelService.findAllOnQuestion(
      questionId
    );

    return responses.reduce(
      (prev, cur) => ({ ...prev, [cur.userId]: cur.response }),
      {}
    );
  }
}
