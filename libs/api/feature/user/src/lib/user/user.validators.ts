import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@pollate/api/shared/util/mongoose';
import { CreateUserRequest, UpdateUserRequest } from '@pollate/type';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserValidator implements CreateUserRequest {
  @Length(1, 25)
  @ApiProperty({ description: 'Users display name', example: 'John Doe' })
  username: string;
}

export class UpdateUserValidator implements UpdateUserRequest {
  @Length(1, 25)
  @ApiProperty({ description: 'Users display name' })
  username: string;
}

export class UpdateUserParamsValidator {
  @IsObjectId()
  userId: string;
}

export class GetUserByUidParamsValidator {
  @IsString()
  @IsNotEmpty()
  uid: string;
}
