export interface IRepository<
  TEntity,
  TCreateArgs,
  TFindUniqueArgs,
  TFindManyArgs,
  TUpdateArgs,
  TDeleteArgs,
> {
  create(args: TCreateArgs): Promise<TEntity>;

  findUnique(args: TFindUniqueArgs): Promise<TEntity | null>;

  findMany(args?: TFindManyArgs): Promise<TEntity[]>;

  update(args: TUpdateArgs): Promise<TEntity>;

  delete(args: TDeleteArgs): Promise<TEntity>;
}
