import { ObjectId } from 'mongoose';
import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';
import { UniqueEntityID } from '../../core/UniqueEntityID';

export type ProfileProps = {
  customerId: string | ObjectId;
  siteUsername: string;
  sitePassword: string;
  commentType: string;
  siteUrl: string;
  publishTime: string;
  commentLimit: number;
  token: string;
};

export class Profile extends Entity<ProfileProps> {
  get profileId(): string | UniqueEntityID {
    return this._id;
  }
  // get isValidForCronJob(): boolean {

  // }
  constructor(props: ProfileProps, id?: UniqueEntityID) {
    super(props, id);
  }

  static create(props: ProfileProps, id?: UniqueEntityID): Result<Profile> {
    if (!props.sitePassword || !props.siteUsername) {
      return Result.fail('invalid profile props');
    }
    const profile = new Profile(props, id);
    return Result.ok(profile);
  }
}
