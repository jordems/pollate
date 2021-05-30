import { UserModelService } from '@deb8/api/data-access/user';
import {
  CreateUserRequest,
  CreateUserResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@deb8/type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userModelService: UserModelService) {}

  create(dto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userModelService.create(dto);
  }

  update(userId: string, dto: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.userModelService.update(userId, dto);
  }
}
