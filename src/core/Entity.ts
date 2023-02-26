import { UniqueEntityID } from './UniqueEntityID';

const isEntity = (v: any): v is Entity<any> => {
  return v instanceof Entity;
};
export abstract class Entity<T> {
  protected readonly _id: UniqueEntityID | string;
  public readonly props: T;

  constructor(props: T, id?: UniqueEntityID | string) {
    this._id = id ? id : new UniqueEntityID();
    this.props = props;
  }

  public equals(object?: Entity<T>): boolean {
    if (object == null || object == undefined) {
      return false;
    }

    if (this === object) {
      return true;
    }

    if (!isEntity(object)) {
      return false;
    }
    if (typeof this._id === 'string') {
      return false;
    }
    return this._id.equals(object._id as UniqueEntityID);
  }
}
