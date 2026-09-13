import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ScheduleModule } from '@nestjs/schedule';
import { ZodSerializerInterceptor } from 'nestjs-zod';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { AccessTokenGuard } from 'src/guards/access-token.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { ZodValidationPipe } from 'src/pipes/zod.pipe';
import { SharedModule } from 'src/shared/shared.module';

import { AppController } from './app.controller';
import { AuthModule } from './routes/auth/auth.module';
import { DiscordWebhookModule } from './routes/discord-webhook/discord-webhook.module';
import { OauthModule } from './routes/oauth/oauth.module';
import { TodoModule } from './routes/todo/todo.module';
import { TodoLabelModule } from './routes/todo-label/todo-label.module';
import { UserModule } from './routes/user/user.module';

@Module({
  imports: [
    SharedModule,
    AuthModule,
    TodoModule,
    UserModule,
    TodoLabelModule,
    ScheduleModule.forRoot(),
    OauthModule,
    DiscordWebhookModule,
  ],
  controllers: [AppController],
  providers: [
    AccessTokenGuard,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ZodSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
