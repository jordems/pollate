import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '@pollate/type';
import { pick } from 'lodash';
import { Model } from 'mongoose';
import { UserDocument, USER_MODEL_NAME } from './user.schema';

@Injectable()
export class UserModelService {
  constructor(
    @InjectModel(USER_MODEL_NAME)
    private model: Model<UserDocument, User>
  ) {}

  static fromDocument(doc: UserDocument): User {
    return pick(doc, ['_id', 'uid', 'name', 'createdAt']);
  }

  /**
   * Find user by mongodb _id
   */
  async findUnique(id: string): Promise<User | null> {
    const user = await this.model.findById(id);

    if (!user) {
      return null;
    }

    return UserModelService.fromDocument(user);
  }

  /**
   * Find user by the firebase uid
   */
  async findByUid(uid: string): Promise<User | null> {
    const user = await this.model.findOne({ uid });

    if (!user) {
      return null;
    }

    return UserModelService.fromDocument(user);
  }

  async create(user: Pick<User, 'uid' | 'name'>): Promise<User> {
    const existingUser = await this.model.findOne({ uid: user.uid });

    if (existingUser) {
      return UserModelService.fromDocument(existingUser);
    }

    return UserModelService.fromDocument(await this.model.create(user));
  }

  async update(id: string, user: Pick<User, 'name'>): Promise<User> {
    return UserModelService.fromDocument(
      await this.model.findByIdAndUpdate(id, { $set: user }, { new: true })
    );
  }
}
