import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiFeatureChatModule } from '@pollate/api/feature/chat';
import { ApiFeatureQuestionModule } from '@pollate/api/feature/question';
import { ApiFeatureResponseModule } from '@pollate/api/feature/response';
import { ApiFeatureUserModule } from '@pollate/api/feature/user';
import { RouterModule } from 'nest-router';
import { routes } from './app.routes';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/pollate', {
      useFindAndModify: false,
    }),
    RouterModule.forRoutes(routes),
    ApiFeatureChatModule,
    ApiFeatureQuestionModule,
    ApiFeatureResponseModule,
    ApiFeatureUserModule,
  ],
})
export class AppModule {}
