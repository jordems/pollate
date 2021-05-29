import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionModelService } from './question-model.service';
import { questionSchema, QUESTION_MODEL_NAME } from './question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: QUESTION_MODEL_NAME, schema: questionSchema },
    ]),
  ],
  providers: [QuestionModelService],
  exports: [QuestionModelService],
})
export class ApiDataAccessChatModule {}
