import { Model } from 'mongoose';
import { Customer, CustomerProps } from '../../domain/Customer';
import { ICustomerRepository } from '../ICustomerRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '../IProfileRepository';
import { Profile, ProfileProps } from '../../domain/Profile';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(
    @InjectModel('Profile')
    private profileModel: Model<ProfileProps>,
  ) {}

  //   async exists(username: string): Promise<boolean> {
  //     const founded = await this.profileModel.findOne({ username }).lean();
  //     if (founded) return true;
  //     else return false;
  //   }
  //   async findByUsername(username: string): Promise<Customer> {
  //     const founded = await this.profileModel.findOne({ username });
  //     if (!founded) throw new Error();
  //     return Customer.create(founded).getValue();
  //   }
  async save(profile: Profile): Promise<void> {
    const result = await this.profileModel.findOneAndUpdate(
      {
        siteUsername: profile.props.siteUsername,
      },
      profile.props,
      { upsert: true },
    );
    console.log(
      '🚀 ~ file: mongooseProfile.ts:34 ~ ProfileRepository ~ save ~ result',
      result,
    );
  }
}
