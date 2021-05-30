import { Module } from '@nestjs/common';
import { ApiDataAccessQuestionModule } from '@pollate/api/data-access/question';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

@Module({
  imports: [ApiDataAccessQuestionModule],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
