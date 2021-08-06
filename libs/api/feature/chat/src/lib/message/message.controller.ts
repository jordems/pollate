import { Body, Controller, Param, Post, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import {
  AuthParam,
  AuthParamsValidator,
  FirebaseAuthGuard,
} from '@pollate/api/shared/util/auth';
import { CreateMessageResponse } from '@pollate/type';
import { MessageService } from './message.service';
import { CreateMessageSwagger } from './message.swagger';
import {
  CreateMessageValidator,
  MessageParamsValidator,
} from './message.validators';

@ApiTags('chat')
@ApiHeader({
  name: 'x-user-id',
  description: 'User creating request',
})
@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  @CreateMessageSwagger()
  @UseGuards(FirebaseAuthGuard)
  create(
    @Param() { questionId }: MessageParamsValidator,
    @AuthParam() { userId }: AuthParamsValidator,
    @Body() dto: CreateMessageValidator
  ): Promise<CreateMessageResponse> {
    return this.messageService.create(questionId, userId, dto);
  }
}
