import { Injectable } from '@nestjs/common';
import { UserModelService } from '@pollate/api/data-access/user';

@Injectable()
export class AuthService {
  constructor(private readonly userModelService: UserModelService) {}

  /**
   *
   * * Temporary solution until a better one is required
   *
   * @param userId - The user id the request says it's coming from
   */
  async validate(userId: string): Promise<boolean> {
    try {
      const user = await this.userModelService.findUnique(userId);

      return !!user;
    } catch {
      return false;
    }
  }
}
