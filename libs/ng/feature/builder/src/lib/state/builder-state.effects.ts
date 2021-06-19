import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

@Injectable()
export class BuilderStateEffects {
  constructor(private actions$: Actions) {}
}
