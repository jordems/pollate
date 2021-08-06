import { Injectable } from '@nestjs/common';
import { UserModelService } from '@pollate/api/data-access/user';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUidResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@pollate/type';
import { NameGeneratorService } from './name-generator/name-generator.service';

@Injectable()
export class UserService {
  constructor(
    private readonly userModelService: UserModelService,
    private readonly nameGeneratorService: NameGeneratorService
  ) {}

  async create(dto: CreateUserRequest): Promise<CreateUserResponse> {
    const {
      username = this.nameGeneratorService.getUniqueName(),
      ...rest
    } = dto;

    return this.userModelService.create({
      username: await this.suffixIfDuplicateUserName(username),
      ...rest,
    });
  }

  get(uid: string): Promise<GetUserByUidResponse> {
    return this.userModelService.findUnique(uid);
  }

  async update(
    userId: string,
    dto: UpdateUserRequest
  ): Promise<UpdateUserResponse> {
    const { username, ...rest } = dto;

    return this.userModelService.update(userId, {
      ...(username && {
        username: await this.suffixIfDuplicateUserName(username),
      }),
      ...rest,
    });
  }

  /**
   * If username already exists add a suffix to the end of it
   * eg. username-1
   */
  async suffixIfDuplicateUserName(
    username: string | undefined
  ): Promise<string> {
    const count = await this.userModelService.countCollidingUsers(username);

    if (count > 0) {
      return `${username}-${count}`;
    }
    return username;
  }
}
