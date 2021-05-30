import { ApiDataAccessQuestionModule } from '@deb8/api/data-access/question';
import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [ApiDataAccessQuestionModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
