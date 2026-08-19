import { Injectable } from '@nestjs/common';
import { Prisma, User } from 'prisma/generated/prisma/client';
import { ProjectedUserType } from 'src/shared/models/user.model';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateArgs,
  Prisma.UserFindFirstArgs,
  Prisma.UserFindUniqueArgs,
  Prisma.UserFindManyArgs,
  Prisma.UserUpdateArgs,
  Prisma.UserDeleteArgs
> {
  constructor(prisma: PrismaService) {
    super(prisma.user);
  }

  findUniqueProjectedUser(where: Prisma.UserWhereUniqueInput): Promise<ProjectedUserType | null> {
    return this.model.findUnique({
      where,
      omit: {
        pwd: true,
        updatedAt: true,
      },
    });
  }
}
