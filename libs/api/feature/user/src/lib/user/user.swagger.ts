import { applyDecorators } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';
import { User } from '@pollate/type';

export function CreateUserSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Creates a user',
    }),
    ApiCreatedResponse({
      type: UserEntity,
    })
  );
}

export function GetUserByUidSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Get a user from the given firebase uid',
    }),
    ApiOkResponse({
      type: UserEntity,
    })
  );
}

export function UpdateUserSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Updates a user',
    }),
    ApiParam({
      name: 'userId',
      description: 'User that is being updated',
    }),
    ApiOkResponse({
      type: UserEntity,
    })
  );
}

class UserEntity implements User {
  @ApiProperty({ description: 'Generated unique id of user' })
  _id: string;

  @ApiProperty({ description: 'Users display name' })
  username: string;
}
