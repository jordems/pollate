import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IsObjectId } from '@pollate/api/shared/util/mongoose';
import { AuthUserParams } from '@pollate/type';
/**
 * Decorator to be used in Nestjs contollers to get the userId out of the request
 */
export const AuthParam = createParamDecorator(
  (_: any, ctx: ExecutionContext): AuthUserParams => {
    const request = ctx.switchToHttp().getRequest();

    return {
      userId: request.headers['x-user-id'],
    };
  }
);

/**
 * Class validator to confirm that the required params have been passed in the request
 */
export class AuthParamsValidator implements AuthUserParams {
  @IsObjectId()
  userId: string;
}
