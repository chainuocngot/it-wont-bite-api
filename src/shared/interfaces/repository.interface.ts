export interface IRepository<
  TEntity,
  TCreateArgs,
  TFindFirstArgs,
  TFindUniqueArgs,
  TFindManyArgs,
  TUpdateArgs,
  TDeleteArgs,
> {
  create(args: TCreateArgs): Promise<TEntity>;

  findFirst(args: TFindFirstArgs): Promise<TEntity | null>;

  findUnique(args: TFindUniqueArgs): Promise<TEntity | null>;

  findMany(args?: TFindManyArgs): Promise<TEntity[]>;

  update(args: TUpdateArgs): Promise<TEntity>;

  delete(args: TDeleteArgs): Promise<TEntity>;
}
