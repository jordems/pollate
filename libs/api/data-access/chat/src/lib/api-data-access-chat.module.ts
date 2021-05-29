import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageModelService } from './message-model.service';
import { messageSchema, MESSAGE_MODEL_NAME } from './message.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: MESSAGE_MODEL_NAME, schema: messageSchema },
    ]),
  ],
  providers: [MessageModelService],
  exports: [MessageModelService],
})
export class ApiDataAccessChatModule {}
