import { ApiFeatureChatModule } from '@deb8/api/feature/chat';
import { ApiFeatureQuestionModule } from '@deb8/api/feature/question';
import { ApiFeatureResponseModule } from '@deb8/api/feature/response';
import { ApiFeatureUserModule } from '@deb8/api/feature/user';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
