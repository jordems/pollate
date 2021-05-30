import { User } from '@deb8/type';
import { applyDecorators } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiProperty,
} from '@nestjs/swagger';

export function CreateUserSwagger() {
  return applyDecorators(
    ApiOperation({
      description: 'Creates a user',
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

  @ApiProperty({ description: 'Firebase uid of the user' })
  uid: string;

  @ApiProperty({ description: 'Users display name' })
  name: string;
}
