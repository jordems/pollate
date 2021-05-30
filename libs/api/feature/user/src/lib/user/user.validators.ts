import { ApiProperty } from '@nestjs/swagger';
import { IsObjectId } from '@pollate/api/shared/util/mongoose';
import { CreateUserRequest, UpdateUserRequest } from '@pollate/type';
import { Length } from 'class-validator';

export class CreateUserValidator implements CreateUserRequest {
  @Length(1, 25)
  @ApiProperty({ description: 'Users display name', example: 'John Doe' })
  name: string;

  @Length(28, 28)
  @ApiProperty({
    description: 'Firebases generated user id (28 characters)',
    example: 'XKrqfb9ZeqSCqM2WkcCxULWTnng2',
  })
  uid: string;
}

export class UpdateUserValidator implements UpdateUserRequest {
  @Length(1, 25)
  @ApiProperty({ description: 'Users display name' })
  name: string;
}

export class UpdateUserParamsValidator {
  @IsObjectId()
  userId: string;
}
