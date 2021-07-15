import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '@pollate/type';
import firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { UserApiService } from './user-api.service';

@Injectable({ providedIn: 'root' })
export class NgAuthService {
  public user$: Observable<User | null>;

  constructor(
    private readonly angularFireAuth: AngularFireAuth,
    private readonly userApiService: UserApiService
  ) {
    this.user$ = this.angularFireAuth.authState.pipe(
      switchMap((firebaseUser) => {
        if (firebaseUser) {
          return this.userApiService.getUserByUid(firebaseUser.uid);
        }

        return of(null);
      })
    );
  }

  async anonLogin(name: string): Promise<void> {
    const { user } = await this.angularFireAuth.signInAnonymously();

    if (!user) {
      alert('Failed to login as anon :(');
      throw new Error('Failed to create firebase user');
    }

    user.updateProfile({ displayName: name });

    this.userApiService
      .createUser({ uid: user.uid, name })
      .pipe(take(1))
      .subscribe();
  }

  async googleLogin(): Promise<void> {
    const provider = new firebase.auth.GoogleAuthProvider();
    const { user } = await this.angularFireAuth.signInWithPopup(provider);

    if (!user) {
      alert('Failed to login with Google :(');
      throw new Error('Failed to create firebase user');
    }

    this.userApiService
      .createUser({ uid: user.uid, name: user.displayName ?? 'Cool guy' })
      .pipe(take(1))
      .subscribe();
  }

  async logout() {
    await this.angularFireAuth.signOut();
  }
}
