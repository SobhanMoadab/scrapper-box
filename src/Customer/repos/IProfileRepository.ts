import { Profile } from '../domain/Profile';

export interface IProfileRepository {
  //   findByUsername(username: string): Promise<Customer>;
  //   exists(username: string): Promise<boolean>;
  save(profile: Profile): Promise<void>;
}
