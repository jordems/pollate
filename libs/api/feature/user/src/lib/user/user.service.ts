import { Injectable } from '@nestjs/common';
import { UserModelService } from '@pollate/api/data-access/user';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUidResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@pollate/type';

@Injectable()
export class UserService {
  constructor(private readonly userModelService: UserModelService) {}

  create(dto: CreateUserRequest): Promise<CreateUserResponse> {
    return this.userModelService.create(dto);
  }

  get(uid: string): Promise<GetUserByUidResponse> {
    return this.userModelService.findUnique(uid);
  }

  update(userId: string, dto: UpdateUserRequest): Promise<UpdateUserResponse> {
    return this.userModelService.update(userId, dto);
  }
}
