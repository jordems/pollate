import { IsObjectId } from '@deb8/api/shared/util/mongoose';
import { CreateUserRequest, UpdateUserRequest } from '@deb8/type';
import { Length } from 'class-validator';

export class CreateUserValidator implements CreateUserRequest {
  @Length(1, 25)
  name: string;

  @Length(28, 28)
  uid: string;
}

export class UpdateUserValidator implements UpdateUserRequest {
  @Length(1, 25)
  name: string;
}

export class UpdateUserParamsValidator {
  @IsObjectId()
  userId: string;
}
