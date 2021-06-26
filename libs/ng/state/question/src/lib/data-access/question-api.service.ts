import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import {
  CreateResponseRequest,
  CreateResponseResponse,
  GetQuestionByStubResponse,
} from '@pollate/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class QuestionApiService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}

  getQuestionByStub(stub: string): Observable<GetQuestionByStubResponse> {
    return this.httpClient.get<GetQuestionByStubResponse>(
      `${this.env.api}question/stub/${stub}`
    );
  }

  createResponse(
    questionId: string,
    dto: CreateResponseRequest
  ): Observable<CreateResponseResponse> {
    return this.httpClient.post<CreateResponseResponse>(
      `${this.env.api}question/${questionId}`,
      dto
    );
  }
}
