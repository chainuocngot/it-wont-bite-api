import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { ProjectedUserType } from 'src/shared/models/user.model';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class UserRepository extends BaseRepository<Prisma.UserDelegate> {
  constructor(prisma: PrismaService) {
    super(prisma.user);
  }

  async findUniqueProjectedUser(
    where: Prisma.UserWhereUniqueInput,
  ): Promise<ProjectedUserType | null> {
    const user = await this.model.findUnique({
      where,
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        bio: true,
        createdAt: true,
        discordWebhook: {
          select: {
            id: true,
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      ...user,
      isDiscordWebhookEnabled: Boolean(user?.discordWebhook?.id),
    };
  }

  async updateWithProjectedUserReturn({
    where,
    data,
  }: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUncheckedUpdateInput;
  }): Promise<ProjectedUserType> {
    const user = await this.model.update({
      where,
      data,
      select: {
        id: true,
        email: true,
        name: true,
        username: true,
        bio: true,
        createdAt: true,
        discordWebhook: {
          select: {
            id: true,
          },
        },
      },
    });

    return {
      ...user,
      isDiscordWebhookEnabled: Boolean(user?.discordWebhook?.id),
    };
  }
}
