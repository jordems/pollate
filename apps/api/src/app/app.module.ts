import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApiFeatureChatModule } from '@pollate/api/feature/chat';
import { ApiFeatureQuestionModule } from '@pollate/api/feature/question';
import { ApiFeatureResponseModule } from '@pollate/api/feature/response';
import { ApiFeatureUserModule } from '@pollate/api/feature/user';
import { AuthModule } from '@pollate/api/shared/util/auth';
import { RouterModule } from 'nest-router';
import { environment } from '../environments/environment';
import { routes } from './app.routes';
@Module({
  imports: [
    MongooseModule.forRoot(environment.MONGODB_URL, {
      useFindAndModify: false,
    }),
    RouterModule.forRoutes(routes),
    ApiFeatureChatModule,
    ApiFeatureQuestionModule,
    ApiFeatureResponseModule,
    ApiFeatureUserModule,
    AuthModule,
  ],
})
export class AppModule {}
