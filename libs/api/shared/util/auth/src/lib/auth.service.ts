import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';

@Injectable()
export class AuthService {
  private auth: admin.auth.Auth;

  constructor() {
    this.auth = admin.initializeApp().auth();
  }

  async validate(idToken: string): Promise<boolean> {
    try {
      const user = await this.auth.verifyIdToken(idToken, true);
      return !!user;
    } catch {
      return false;
    }
  }
}
