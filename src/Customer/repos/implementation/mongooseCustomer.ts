import { Model } from 'mongoose';
import { Customer, CustomerProps } from '../../domain/Customer';
import { ICustomerRepository } from '../ICustomerRepository';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
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
  async findByUsername(username: string): Promise<Customer> {
    const founded = await this.customerModel.findOne({ username });
    if (!founded) throw new Error();
    return Customer.create(founded).getValue();
  }
  async save(customer: Customer): Promise<void> {
    await this.customerModel.findOneAndUpdate(
      {
        username: customer.props.username,
      },
      customer.props,
      { upsert: true },
    );
  }
}
