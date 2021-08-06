import { Injectable } from '@angular/core';
import { UpdateUserRequest, User } from '@pollate/type';
import { Observable } from 'rxjs';
import { UserApiService } from './user-api.service';

const USER_KEY = 'LMAO_SICK_SECURE_USER';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Non-secure system
 * - Not requiring passwords
 */
@Injectable({ providedIn: 'root' })
export class NgAuthService {
  constructor(private readonly userApiService: UserApiService) {}

  getUser(): User | null {
    const foundUser = localStorage.getItem(USER_KEY);

    return foundUser ? JSON.parse(foundUser) : null;
  }

  upsertUser(dto: UpdateUserRequest): Observable<User> {
    const user = this.getUser();

    if (user) {
      this.userApiService.updateUser(user._id, dto);
    } else {
      this.userApiService.createUser(dto);
    }
  }
}
