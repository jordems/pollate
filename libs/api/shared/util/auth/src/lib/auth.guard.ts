import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AuthService } from './auth.service';

/*
 * Not arguing this is the best way to authenticate the client. But, it's secure enough for a product like this c:
 */

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(@Inject(AuthService) private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.headers['x-user-id'];

    if (userId) {
      return this.authService.validate(userId);
    }

    return false;
  }
}
