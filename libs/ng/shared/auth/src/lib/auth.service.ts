import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({ providedIn: 'root' })
export class NgAuthService {
  public firebaseUser$: AngularFireAuth['authState'];

  constructor(private readonly angularFireAuth: AngularFireAuth) {
    this.firebaseUser$ = this.angularFireAuth.authState;
  }

  createAnonUser() {
    const crethis.angularFireAuth.signInAnonymously();
  }
}
