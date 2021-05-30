import { ApiDataAccessUserModule } from '@deb8/api/data-access/user';
import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ApiDataAccessUserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
