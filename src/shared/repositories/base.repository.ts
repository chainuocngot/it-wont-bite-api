import { IRepository } from 'src/shared/interfaces/repository.interface';

export abstract class BaseRepository<
  TEntity,
  TCreateArgs,
  TFindUniqueArgs,
  TFindManyArgs,
  TUpdateArgs,
  TDeleteArgs,
> implements IRepository<
  TEntity,
  TCreateArgs,
  TFindUniqueArgs,
  TFindManyArgs,
  TUpdateArgs,
  TDeleteArgs
> {
  protected constructor(
    protected readonly model: {
      create(args: TCreateArgs): Promise<TEntity>;
      findUnique(args: TFindUniqueArgs): Promise<TEntity | null>;
      findMany(args?: TFindManyArgs): Promise<TEntity[]>;
      update(args: TUpdateArgs): Promise<TEntity>;
      delete(args: TDeleteArgs): Promise<TEntity>;
    },
  ) {}

  create(args: TCreateArgs) {
    return this.model.create(args);
  }

  findUnique(args: TFindUniqueArgs) {
    return this.model.findUnique(args);
  }

  findMany(args?: TFindManyArgs) {
    return this.model.findMany(args);
  }

  update(args: TUpdateArgs) {
    return this.model.update(args);
  }

  delete(args: TDeleteArgs) {
    return this.model.delete(args);
  }
}
