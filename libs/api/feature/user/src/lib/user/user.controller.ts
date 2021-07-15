import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FirebaseAuthGuard } from '@pollate/api/shared/util/auth';
import {
  CreateUserResponse,
  GetUserByUidResponse,
  UpdateUserResponse,
} from '@pollate/type';
import { UserService } from './user.service';
import {
  CreateUserSwagger,
  GetUserByUidSwagger,
  UpdateUserSwagger,
} from './user.swagger';
import {
  CreateUserValidator,
  GetUserByUidParamsValidator,
  UpdateUserParamsValidator,
  UpdateUserValidator,
} from './user.validators';

@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @CreateUserSwagger()
  create(@Body() dto: CreateUserValidator): Promise<CreateUserResponse> {
    return this.userService.create(dto);
  }

  @Get('uid/:uid')
  @GetUserByUidSwagger()
  @UseGuards(FirebaseAuthGuard)
  get(
    @Param() { uid }: GetUserByUidParamsValidator
  ): Promise<GetUserByUidResponse> {
    return this.userService.get(uid);
  }

  @Put(':userId')
  @UpdateUserSwagger()
  @UseGuards(FirebaseAuthGuard)
  update(
    @Param() { userId }: UpdateUserParamsValidator,
    @Body() dto: UpdateUserValidator
  ): Promise<UpdateUserResponse> {
    return this.userService.update(userId, dto);
  }
}
