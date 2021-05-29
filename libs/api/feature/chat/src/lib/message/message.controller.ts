import { CreateMessageResponse } from '@deb8/type/deb8';
import { Controller, Post } from '@nestjs/common';
import { MessageService } from './message.service';


@Controller()
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Post()
  create(

  ): Promise<CreateMessageResponse> {
      this.
  }
}
