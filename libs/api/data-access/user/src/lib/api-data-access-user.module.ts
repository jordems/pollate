import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModelService } from './user-model.service';
import { userSchema, USER_MODEL_NAME } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: USER_MODEL_NAME, schema: userSchema }]),
  ],
  providers: [UserModelService],
  exports: [UserModelService],
})
export class ApiDataAccessUserModule {}
