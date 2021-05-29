import { Message, PaginateParams } from '@deb8/type/deb8';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { pick } from 'lodash';
import { Model, ObjectId } from 'mongoose';
import { MessageDocument, MESSAGE_MODEL_NAME } from './message.schema';

@Injectable()
export class MessageModelService {
  constructor(
    @InjectModel(MESSAGE_MODEL_NAME)
    private model: Model<MessageDocument, Message>
  ) {}

  static fromMessageDocument(doc: MessageDocument): Message {
    return pick(doc, [
      '_id',
      'name',
      'text',
      'questionId',
      'userId',
      'createdAt',
    ]);
  }

  async create(
    message: Pick<Message, 'name' | 'text' | 'questionId' | 'userId'>
  ): Promise<Message> {
    return MessageModelService.fromMessageDocument(
      await this.model.create(message)
    );
  }

  /**
   * Finds the messages from the question. Sorted from most recent, to oldest.
   *
   * @param questionId - question to get messages for
   * @param paginateParams - params for pagination on messages
   */
  async findMessagesOnQuestion(
    questionId: ObjectId,
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
    ).map((message) => MessageModelService.fromMessageDocument(message));
  }
}
