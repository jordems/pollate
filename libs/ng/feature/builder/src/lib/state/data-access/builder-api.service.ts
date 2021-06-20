import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import { CreateQuestionRequest, CreateQuestionResponse } from '@pollate/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BuilderApiService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}

  createQuestion(
    dto: CreateQuestionRequest
  ): Observable<CreateQuestionResponse> {
    return this.httpClient.post<CreateQuestionResponse>(
      `${this.env.api}question`,
      dto
    );
  }
}
