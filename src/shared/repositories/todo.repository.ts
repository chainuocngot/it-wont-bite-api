import { Injectable } from '@nestjs/common';
import { Prisma, Todo } from 'prisma/generated/prisma/client';
import { BaseRepository } from 'src/shared/repositories/base.repository';
import { PrismaService } from 'src/shared/services/prisma.service';

@Injectable()
export class TodoRepository extends BaseRepository<
  Todo,
  Prisma.TodoCreateArgs,
  Prisma.TodoFindUniqueArgs,
  Prisma.TodoFindManyArgs,
  Prisma.TodoUpdateArgs,
  Prisma.TodoDeleteArgs
> {
  constructor(prisma: PrismaService) {
    super(prisma.todo);
  }
}
