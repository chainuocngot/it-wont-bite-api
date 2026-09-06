import { Prisma } from 'prisma/generated/prisma/client';

type Delegate = {
  create: (args: unknown) => Promise<unknown>;
  findFirst: (args: unknown) => Promise<unknown>;
  findUnique: (args: unknown) => Promise<unknown>;
  findMany: (args?: unknown) => Promise<unknown>;
  update: (args: unknown) => Promise<unknown>;
  delete: (args: unknown) => Promise<unknown>;
};

export abstract class BaseRepository<TDelegate extends Delegate> {
  protected constructor(protected readonly model: TDelegate) {}

  create<T extends Parameters<TDelegate['create']>[number]>(args: T) {
    return this.model.create(args) as Promise<Prisma.Result<TDelegate, T, 'create'>>;
  }

  findFirst<T extends Parameters<TDelegate['findFirst']>[number]>(args: T) {
    return this.model.findFirst(args) as Promise<Prisma.Result<TDelegate, T, 'findFirst'>>;
  }

  findUnique<T extends Parameters<TDelegate['findUnique']>[number]>(args: T) {
    return this.model.findUnique(args) as Promise<Prisma.Result<TDelegate, T, 'findUnique'>>;
  }

  findMany<T extends Parameters<TDelegate['findMany']>[number]>(args?: T) {
    return this.model.findMany(args) as Promise<Prisma.Result<TDelegate, T, 'findMany'>>;
  }

  update<T extends Parameters<TDelegate['update']>[number]>(args: T) {
    return this.model.update(args) as Promise<Prisma.Result<TDelegate, T, 'update'>>;
  }

  delete<T extends Parameters<TDelegate['delete']>[number]>(args: T) {
    return this.model.delete(args) as Promise<Prisma.Result<TDelegate, T, 'delete'>>;
  }
}
