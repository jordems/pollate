import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { NgEnvironment, NG_ENVIRONMENT } from '@pollate/ng/shared/environment';
import {
  CreateResponseRequest,
  CreateResponseResponse,
  UpdateResponseRequest,
  UpdateResponseResponse,
} from '@pollate/type';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResponseApiService {
  constructor(
    private readonly httpClient: HttpClient,
    @Inject(NG_ENVIRONMENT) private readonly env: NgEnvironment
  ) {}

  createResponse(
    questionId: string,
    dto: CreateResponseRequest
  ): Observable<CreateResponseResponse> {
    return this.httpClient.post<CreateResponseResponse>(
      `${this.env.api}question/${questionId}/response`,
      dto
    );
  }

  updateResponse(
    questionId: string,
    responseId: string,
    dto: UpdateResponseRequest
  ): Observable<UpdateResponseResponse> {
    return this.httpClient.put<UpdateResponseResponse>(
      `${this.env.api}question/${questionId}/response/${responseId}`,
      dto
    );
  }
}
