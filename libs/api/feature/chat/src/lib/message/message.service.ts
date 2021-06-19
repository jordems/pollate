import { Injectable } from '@nestjs/common';
import { MessageModelService } from '@pollate/api/data-access/chat';
import { QuestionModelService } from '@pollate/api/data-access/question';
import { UserModelService } from '@pollate/api/data-access/user';
import { QuestionGatewayService } from '@pollate/api/shared/gateway/question';
import { CreateMessageRequest, CreateMessageResponse } from '@pollate/type';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageModelService: MessageModelService,
    private readonly userModelService: UserModelService,
    private readonly questionModelService: QuestionModelService,
    private readonly pollateGatewayService: QuestionGatewayService
  ) {}

  /**
   * Fetches the users name who is sending the message, then creates the message in the database.
   * - Increments memoized `messageCount` on question
   * - Pushes the message to all clients using the gateway
   *
   */
  async create(
    questionId: string,
    userId: string,
    dto: CreateMessageRequest
  ): Promise<CreateMessageResponse> {
    // Don't need to worry about this being null, as the user was validated earlier in request
    const { name } = await this.userModelService.findUnique(userId);

    const [createdMessage] = await Promise.all([
      this.messageModelService.create({
        ...dto,
        name,
        questionId,
        userId,
      }),
      this.questionModelService.incrementMessageCount(questionId),
    ]);

    this.pollateGatewayService.emit(questionId, 'onMessage', {
      message: MessageModelService.toMinimal(createdMessage),
    });

    return createdMessage;
  }
}
