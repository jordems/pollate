import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { BuilderApiService } from './data-access/builder-api.service';

@Injectable({ providedIn: 'root' })
export class BuilderStore {
  constructor(
    private readonly builderApiService: BuilderApiService,
    private readonly router: Router
  ) {}

  /**
   * Subjects
   */
  private readonly _question = new BehaviorSubject<string>('');
  private readonly _responses = new BehaviorSubject<string[]>(['', '']);
  private readonly _submissionLoading = new BehaviorSubject<boolean>(false);

  /**
   * Observables
   */
  readonly question$ = this._question.asObservable();
  readonly responses$ = this._responses.asObservable();
  readonly submissionLoading$ = this._submissionLoading.asObservable();

  /**
   * Getters and setters
   */
  private get question(): string {
    return this._question.getValue();
  }
  private set question(value: string) {
    this._question.next(value);
  }

  private get responses(): string[] {
    return this._responses.getValue();
  }
  private set responses(value: string[]) {
    this._responses.next(value);
  }

  private get submissionLoading(): boolean {
    return this._submissionLoading.getValue();
  }
  private set submissionLoading(value: boolean) {
    this._submissionLoading.next(value);
  }

  /**
   * Actions
   */
  updateQuestion(value: string): void {
    this.question = value;
  }

  updateResponses(value: string[]): void {
    this.responses = value;
  }
  addResponse(): void {
    this.responses = [...this.responses, ''];
  }
  removeResponse(idx: number): void {
    this.responses = this.responses.splice(idx, 1);
  }

  submit(): void {
    this.submissionLoading = true;

    this.builderApiService
      .createQuestion({
        question: this.question,
        responses: this.responses,
      })
      .pipe(
        catchError((err) => {
          alert(err.error?.message || 'Unknown Error, soddy');
          return throwError(err);
        })
      )
      .subscribe((question) => {
        const { stub } = question;

        this.router.navigate([`/${stub}`, { share: true }]);

        this.submissionLoading = false;
      });
  }
}
