import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthStrategy } from './auth.strategy';

@Module({
  providers: [AuthService, AuthStrategy],
})
export class AuthModule {}
