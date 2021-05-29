import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ResponseModelService } from './response-model.service';
import { responseSchema, RESPONSE_MODEL_NAME } from './response.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: RESPONSE_MODEL_NAME, schema: responseSchema },
    ]),
  ],
  providers: [ResponseModelService],
  exports: [ResponseModelService],
})
export class ApiDataAccessResponseModule {}
