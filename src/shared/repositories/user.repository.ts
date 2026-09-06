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

  findUniqueProjectedUser(where: Prisma.UserWhereUniqueInput): Promise<ProjectedUserType | null> {
    return this.model.findUnique({
      where,
      omit: {
        pwd: true,
        updatedAt: true,
      },
    });
  }

  updateWithProjectedUserReturn({
    where,
    data,
  }: {
    where: Prisma.UserWhereUniqueInput;
    data: Prisma.UserUncheckedUpdateInput;
  }): Promise<ProjectedUserType> {
    return this.model.update({
      where,
      data,
      omit: {
        pwd: true,
        updatedAt: true,
      },
    });
  }
}
