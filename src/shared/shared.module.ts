import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { DiscordWebhookRepository } from 'src/shared/repositories/discord-webhook.repository';
import { RefreshTokenRepository } from 'src/shared/repositories/refresh-token.repository';
import { TodoRepository } from 'src/shared/repositories/todo.repository';
import { TodoLabelRepository } from 'src/shared/repositories/todo-label.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { CronService } from 'src/shared/services/cron.service';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { SharedAuthService } from 'src/shared/services/shared-auth.service';
import { TokenService } from 'src/shared/services/token.service';

const shared = [
  PrismaService,
  UserRepository,
  HashingService,
  TokenService,
  RefreshTokenRepository,
  TodoRepository,
  TodoLabelRepository,
  CronService,
  SharedAuthService,
  DiscordWebhookRepository,
];

@Global()
@Module({
  imports: [JwtModule],
  providers: [...shared],
  exports: [...shared],
})
export class SharedModule {}
