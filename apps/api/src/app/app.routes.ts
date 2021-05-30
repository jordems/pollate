import { MessageModule } from '@deb8/api/feature/chat';
import { QuestionModule } from '@deb8/api/feature/question';
import { ResponseModule } from '@deb8/api/feature/response';
import { UserModule } from '@deb8/api/feature/user';
import { Routes } from 'nest-router';

export const routes: Routes = [
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
