import { Injectable } from '@angular/core';
import { UpdateUserRequest, User } from '@pollate/type';
import { BehaviorSubject, Observable } from 'rxjs';
import { first, tap } from 'rxjs/operators';
import { UserApiService } from './user-api.service';

const USER_KEY = 'LMAO_SICK_SECURE_USER';

/**
 * !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
 * Non-secure system
 * - Not requiring passwords
 */
@Injectable({ providedIn: 'root' })
export class NgAuthService {
  private userSubject = new BehaviorSubject<User | null>(null);
  private $user = this.userSubject.asObservable();

  constructor(private readonly userApiService: UserApiService) {
    const foundUserString = localStorage.getItem(USER_KEY);

    this.userSubject.next(foundUserString ? JSON.parse(foundUserString) : null);
  }

  /**
   * Get user as observable
   */
  getUser(): Observable<User | null> {
    return this.$user;
  }

  /**
   * If user exists in local storage then update the user,
   * otherwise create a new user.
   *
   * Then update the user in local storage
   */
  upsertUser(dto: UpdateUserRequest): Observable<User> {
    const user = this.userSubject.getValue();

    if (user) {
      return this.userApiService.updateUser(user._id, dto).pipe(
        first(),
        tap((user) => this.setUser(user))
      );
    } else {
      return this.userApiService.createUser(dto).pipe(
        first(),
        tap((user) => this.setUser(user))
      );
    }
  }

  /**
   * Update user in local storage and in rxjs subject
   */
  private setUser(user: User): void {
    const userString = JSON.stringify(user);

    localStorage.setItem(USER_KEY, userString);

    this.userSubject.next(user);
  }
}
