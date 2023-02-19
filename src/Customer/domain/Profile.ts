import { ObjectId } from 'mongoose';
import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';

export type ProfileProps = {
  customerId: string | ObjectId;
  siteUsername: string;
  sitePassword: string;
  commentType: string;
  siteUrl: string;
};

export class Profile extends Entity<ProfileProps> {
  constructor(props: ProfileProps) {
    super(props);
  }

  static create(props: ProfileProps): Result<Profile> {
    if (!props.sitePassword || !props.siteUsername) {
      return Result.fail('invalid profile props');
    }
    const profile = new Profile(props);
    return Result.ok(profile);
  }
}
