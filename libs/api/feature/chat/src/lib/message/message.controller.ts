import { AuthParam, AuthParamsValidator } from '@deb8/api/shared/util/auth';
import { CreateMessageResponse } from '@deb8/type';
import { Body, Controller, Param, Post } from '@nestjs/common';
import { MessageService } from './message.service';
import { CreateMessageSwagger } from './message.swagger';
import {
  CreateMessageValidator,
  MessageParamsValidator,
} from './message.validators';

@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @CreateMessageSwagger()
  create(
    @Param() { questionId }: MessageParamsValidator,
    @AuthParam() { userId }: AuthParamsValidator,
    @Body() dto: CreateMessageValidator
  ): Promise<CreateMessageResponse> {
    return this.messageService.create(questionId, userId, dto);
  }
}
