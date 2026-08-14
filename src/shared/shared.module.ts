import { Global, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenRepository } from 'src/shared/repositories/refresh-token.repository';
import { TodoRepository } from 'src/shared/repositories/todo.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { HashingService } from 'src/shared/services/hashing.service';
import { PrismaService } from 'src/shared/services/prisma.service';
import { TokenService } from 'src/shared/services/token.service';

@Global()
@Module({
  imports: [JwtModule],
  providers: [
    PrismaService,
    UserRepository,
    HashingService,
    TokenService,
    RefreshTokenRepository,
    TodoRepository,
  ],
  exports: [
    PrismaService,
    UserRepository,
    HashingService,
    TokenService,
    RefreshTokenRepository,
    TodoRepository,
  ],
})
export class SharedModule {}
