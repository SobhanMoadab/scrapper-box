import { Model } from 'mongoose';
import { Customer, CustomerProps } from '../../domain/Customer';
import { ICustomerRepository } from '../ICustomerRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IProfileRepository } from '../IProfileRepository';
import { Profile, ProfileProps } from '../../domain/Profile';
import { UniqueEntityID } from '../../../core/UniqueEntityID';

@Injectable()
export class ProfileRepository implements IProfileRepository {
  constructor(
    @InjectModel('Profile')
    private profileModel: Model<ProfileProps>,
  ) {}

  /*
   get only events that are for today
   check if events belong to profile that is not limited
   if type is daily {
    find two time
   }
   transfer them
   and limit the account
  */

  //   async exists(username: string): Promise<boolean> {
  //     const founded = await this.profileModel.findOne({ username }).lean();
  //     if (founded) return true;
  //     else return false;
  //   }
  async findByCustomerId(id: string): Promise<Profile> {
    const founded = await this.profileModel.findOne({ customerId: id });
    if (!founded) throw new Error();
    return Profile.create(
      {
        commentLimit: founded.commentLimit,
        commentType: founded.commentType,
        customerId: founded.customerId,
        publishType: founded.publishType,
        sitePassword: founded.sitePassword,
        siteUrl: founded.siteUrl,
        siteUsername: founded.siteUsername,
        token: founded.token,
      },
      new UniqueEntityID(founded._id.toString()),
    ).getValue();
  }

  async save(profile: Profile): Promise<void> {
    await this.profileModel.findOneAndUpdate(
      {
        siteUsername: profile.props.siteUsername,
      },
      profile.props,
      { upsert: true },
    );
  }
}
