import { Global, Module } from '@nestjs/common';
import { ApiDataAccessUserModule } from '@pollate/api/data-access/user';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [ApiDataAccessUserModule],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
