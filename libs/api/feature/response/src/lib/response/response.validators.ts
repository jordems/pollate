import { IsObjectId } from '@deb8/api/shared/util/mongoose';
import { CreateResponseRequest, UpdateResponseRequest } from '@deb8/type';
import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class CreateResponseValidator implements CreateResponseRequest {
  @Length(1, 50)
  @ApiProperty({ description: 'The response given to the question' })
  response!: string;
}

export class UpdateResponseValidator
  extends CreateResponseValidator
  implements UpdateResponseRequest {}

export class CreateResponseParamsValidator {
  @IsObjectId()
  questionId: string;
}

export class UpdateResponseParamsValidator extends CreateResponseParamsValidator {
  @IsObjectId()
  responseId: string;
}
