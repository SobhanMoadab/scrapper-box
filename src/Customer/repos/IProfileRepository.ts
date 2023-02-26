import { Profile } from '../domain/Profile';

export interface IProfileRepository {
  findByCustomerId(customerId: string): Promise<Profile>;
  //   exists(username: string): Promise<boolean>;
  save(profile: Profile): Promise<void>;
}
