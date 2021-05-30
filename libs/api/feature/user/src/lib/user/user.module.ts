import { Module } from '@nestjs/common';
import { ApiDataAccessUserModule } from '@pollate/api/data-access/user';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [ApiDataAccessUserModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
