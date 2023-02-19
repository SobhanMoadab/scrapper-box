import { Model } from 'mongoose';
import { CustomerProps } from '../../domain/Customer';
import { ICustomerRepository } from '../ICustomerRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CustomerModel } from '../../../infra/database/models/Customer';
@Injectable()
export class CustomerRepository implements ICustomerRepository {
  constructor(
    @InjectModel('Customer')
    private customerModel: Model<CustomerProps>,
  ) {}

  async exists(username: string): Promise<boolean> {
    const founded = await this.customerModel.findOne({ username }).lean();
    if (founded) return true;
    else return false;
  }
}
