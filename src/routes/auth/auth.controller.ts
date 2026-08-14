import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ZodSerializerDto } from 'nestjs-zod';
import {
  LoginBodyDto,
  LoginResDto,
  RegisterBodyDto,
  RegisterResDto,
} from 'src/routes/auth/auth.dto';
import { AuthService } from 'src/routes/auth/auth.service';
import { IsPublic } from 'src/shared/decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @IsPublic()
  @HttpCode(HttpStatus.CREATED)
  @ZodSerializerDto(RegisterResDto)
  register(@Body() body: RegisterBodyDto) {
    return this.authService.register(body);
  }

  @Post('login')
  @IsPublic()
  @HttpCode(HttpStatus.OK)
  @ZodSerializerDto(LoginResDto)
  login(@Body() body: LoginBodyDto) {
    return this.authService.login(body);
  }
}
