import { Body, Controller, Get, HttpCode, HttpStatus, Param, Patch } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  GetMeResDto,
  GetUserByUsernameResDto,
  GetUserIdParamDto,
  GetUsernameParamDto,
  UpdateMeBodyDto,
  UpdateMeResDto,
} from 'src/routes/user/user.dto';
import { UserService } from 'src/routes/user/user.service';
import { ActiveUser } from 'src/shared/decorators/active-user.decorator';
import { IsPublic } from 'src/shared/decorators/auth.decorator';
import { UserType } from 'src/shared/models/user.model';

@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetMeResDto)
  getMe(@ActiveUser('userId') userId: UserType['id']) {
    return this.userService.getMe(userId);
  }

  @Get(':username')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(GetUserByUsernameResDto)
  getUserByUsername(@Param() param: GetUsernameParamDto) {
    return this.userService.getUserByUsername(param.username);
  }

  @Patch(':userId')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(UpdateMeResDto)
  updateMe(@Param() param: GetUserIdParamDto, @Body() body: UpdateMeBodyDto) {
    return this.userService.updateMe(param.userId, body);
  }
}
