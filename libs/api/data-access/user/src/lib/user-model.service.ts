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
    return { ...pick(doc, ['username', 'createdAt']), _id: doc._id };
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

  async create(user: Pick<User, 'username'>): Promise<User> {
    const existingUser = await this.model.findOne({ username: user.username });

    if (existingUser) {
      return UserModelService.fromDocument(existingUser);
    }

    return UserModelService.fromDocument(await this.model.create(user));
  }

  async update(id: string, user: Pick<User, 'username'>): Promise<User> {
    return UserModelService.fromDocument(
      await this.model.findByIdAndUpdate(id, { $set: user }, { new: true })
    );
  }

  async countCollidingUsers(username: string): Promise<number> {
    return this.model.countDocuments({
      username: { $regex: new RegExp(`/^${username}-[0-9]+$/g`) },
    });
  }
}
