import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class TodoLabelRepository extends BaseRepository<Prisma.TodoLabelDelegate> {
  constructor(prisma: PrismaService) {
    super(prisma.todoLabel);
  }
}
