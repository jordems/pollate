import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import {
  CreateUserRequest,
  CreateUserResponse,
  GetUserByUidResponse,
  UpdateUserRequest,
  UpdateUserResponse,
} from '@pollate/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserApiService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}

  getUserByUid(uid: string): Observable<GetUserByUidResponse> {
    return this.httpClient.get<GetUserByUidResponse>(
      `${this.env.api}user/uid/${uid}`
    );
  }

  createUser(dto: CreateUserRequest): Observable<CreateUserResponse> {
    return this.httpClient.post<CreateUserResponse>(`${this.env.api}user`, dto);
  }

  updateUser(
    userId: string,
    dto: UpdateUserRequest
  ): Observable<UpdateUserResponse> {
    return this.httpClient.put<UpdateUserResponse>(
      `${this.env.api}user/${userId}`,
      dto
    );
  }
}
