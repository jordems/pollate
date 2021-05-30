import { CreateUserResponse, UpdateUserResponse } from '@deb8/type';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserSwagger, UpdateUserSwagger } from './user.swagger';
import {
  CreateUserValidator,
  UpdateUserParamsValidator,
  UpdateUserValidator,
} from './user.validators';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateUserSwagger()
  create(@Body() dto: CreateUserValidator): Promise<CreateUserResponse> {
    return this.userService.create(dto);
  }

  @Put(':userId')
  @UpdateUserSwagger()
  update(
    @Param() { userId }: UpdateUserParamsValidator,
    @Body() dto: UpdateUserValidator
  ): Promise<UpdateUserResponse> {
    return this.userService.update(userId, dto);
  }
}
