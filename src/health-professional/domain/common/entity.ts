export declare abstract class Entity<T> {
  private _id;
  private _createdAt;
  private _updatedAt;

  get id(): T;
  get createdAt(): Date;
  get updatedAt(): Date;

  setId(id: T): void;
}
