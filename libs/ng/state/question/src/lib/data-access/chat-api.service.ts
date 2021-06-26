import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { CreateMessageRequest, CreateMessageResponse } from '@pollate/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ChatApiService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}

  createMessage(
    questionId: string,
    dto: CreateMessageRequest
  ): Observable<CreateMessageResponse> {
    return this.httpClient.post<CreateMessageResponse>(
      `${this.env.api}question/${questionId}/message`,
      dto
    );
  }
}
