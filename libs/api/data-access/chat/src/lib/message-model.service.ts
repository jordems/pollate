import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MinimalMessage, PaginateParams } from '@pollate/type';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { MessageDocument, MESSAGE_MODEL_NAME } from './message.schema';

@Injectable()
export class MessageModelService {
  constructor(
    @InjectModel(MESSAGE_MODEL_NAME)
    private model: Model<MessageDocument, Message>
  ) {}

  static fromDocument(doc: MessageDocument): Message {
    return {
      ...pick(doc, ['name', 'text', 'questionId', 'userId', 'createdAt']),
      _id: doc._id,
    };
  }

  static toMinimal<T extends Message>(message: T): MinimalMessage {
    return pick(message, ['name', 'text', 'createdAt', 'userId']);
  }

  async create(
    message: Pick<Message, 'name' | 'text' | 'questionId' | 'userId'>
  ): Promise<Message> {
    return MessageModelService.fromDocument(await this.model.create(message));
  }

  /**
   * Finds the messages from the question. Sorted from most recent, to oldest.
   *
   * @param questionId - question to get messages for
   * @param paginateParams - params for pagination on messages
   */
  async findMessagesOnQuestion(
    questionId: string,
    { startId, limit }: PaginateParams
  ): Promise<Message[]> {
    return (
      await this.model
        .find({
          questionId,
          ...(startId ? { _id: { gt: startId } } : undefined),
        })
        .sort({ createdAt: -1 })
        .limit(limit)
    ).map((message) => MessageModelService.fromDocument(message));
  }
}
