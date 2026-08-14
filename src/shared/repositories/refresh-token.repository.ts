import { Injectable } from '@nestjs/common';
import { Prisma, RefreshToken } from 'prisma/generated/prisma/client';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class RefreshTokenRepository extends BaseRepository<
  RefreshToken,
  Prisma.RefreshTokenCreateArgs,
  Prisma.RefreshTokenFindUniqueArgs,
  Prisma.RefreshTokenFindManyArgs,
  Prisma.RefreshTokenUpdateArgs,
  Prisma.RefreshTokenDeleteArgs
> {
  constructor(prisma: PrismaService) {
    super(prisma.refreshToken);
  }
}
