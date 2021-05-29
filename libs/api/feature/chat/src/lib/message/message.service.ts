import { MessageModelService } from '@deb8/api/data-access/chat';
import { UserModelService } from '@deb8/api/data-access/user';
import { CreateMessageRequest, CreateMessageResponse } from '@deb8/type/deb8';
import { Injectable } from '@nestjs/common';
import { ObjectId } from 'mongoose';

@Injectable()
export class MessageService {
  constructor(
    private readonly messageModelService: MessageModelService,
    private readonly userModelService: UserModelService
  ) {}

  /**
   * Fetchs the users name who is sending the message, then creates the message in the database.
   * Finally it will push the message to all clients using the gateway
   *
   */
  async create(
    questionId: ObjectId,
    userId: ObjectId,
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

    // TODO Send message to gateway

    return createdMessage;
  }
}
