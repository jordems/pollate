import { MessageModelService } from '@deb8/api/data-access/chat';
import { UserModelService } from '@deb8/api/data-access/user';
import { Deb8GatewayService } from '@deb8/api/shared/gateway/deb8';
import { CreateMessageRequest, CreateMessageResponse } from '@deb8/type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageModelService: MessageModelService,
    private readonly userModelService: UserModelService,
    private readonly deb8GatewayService: Deb8GatewayService
  ) {}

  /**
   * Fetchs the users name who is sending the message, then creates the message in the database.
   * Finally it will push the message to all clients using the gateway
   */
  async create(
    questionId: string,
    userId: string,
    dto: CreateMessageRequest
  ): Promise<CreateMessageResponse> {
    // Don't need to worry about this being null, as the user was validated earlier in request
    const { name } = await this.userModelService.findUnique(userId);

    const createdMessage = await this.messageModelService.create({
      ...dto,
      name,
      questionId,
      userId,
    });

    this.deb8GatewayService.emit(questionId, 'onMessage', {
      message: MessageModelService.toMinimal(createdMessage),
    });

    return createdMessage;
  }
}
