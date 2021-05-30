import { AuthParam, AuthParamsValidator } from '@deb8/api/shared/util/auth';
import { CreateResponseResponse, UpdateResponseResponse } from '@deb8/type';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { ResponseService } from './response.service';
import {
  CreateResponseSwagger,
  UpdateResponseSwagger,
} from './response.swagger';
import {
  CreateResponseParamsValidator,
  CreateResponseValidator,
  UpdateResponseParamsValidator,
  UpdateResponseValidator,
} from './response.validators';

@ApiTags('response')
@ApiHeader({
  name: 'x-user-id',
  description: 'User creating request',
})
@Controller()
export class ResponseController {
  constructor(private readonly responseService: ResponseService) {}

  @Post()
  @CreateResponseSwagger()
  create(
    @Param() { questionId }: CreateResponseParamsValidator,
    @AuthParam() { userId }: AuthParamsValidator,
    @Body() dto: CreateResponseValidator
  ): Promise<CreateResponseResponse> {
    return this.responseService.create(questionId, userId, dto);
  }

  @Put(':responseId')
  @UpdateResponseSwagger()
  update(
    @Param() { questionId, responseId }: UpdateResponseParamsValidator,
    @Body() dto: UpdateResponseValidator
  ): Promise<UpdateResponseResponse> {
    return this.responseService.update(questionId, responseId, dto);
  }
}
