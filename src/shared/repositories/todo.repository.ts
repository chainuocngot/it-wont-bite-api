import { Injectable } from '@nestjs/common';
import { Prisma } from 'prisma/generated/prisma/client';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class TodoRepository extends BaseRepository<Prisma.TodoDelegate> {
  constructor(prisma: PrismaService) {
    super(prisma.todo);
  }
}
