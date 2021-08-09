import { MessageModule } from '@pollate/api/feature/chat';
import { HealthModule } from '@pollate/api/feature/health';
import { QuestionModule } from '@pollate/api/feature/question';
import { ResponseModule } from '@pollate/api/feature/response';
import { UserModule } from '@pollate/api/feature/user';
import { Routes } from 'nest-router';

export const routes: Routes = [
  {
    path: 'health',
    module: HealthModule,
  },
  {
    path: 'user',
    module: UserModule,
  },
  {
    path: 'question',
    module: QuestionModule,
    children: [
      {
        path: ':questionId',
        children: [
          {
            path: 'response',
            module: ResponseModule,
          },
          {
            path: 'message',
            module: MessageModule,
          },
        ],
      },
    ],
  },
];
