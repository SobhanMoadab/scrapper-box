import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repos/implementation/mongooseCustomer';
import { MongooseModule } from '@nestjs/mongoose';
import {
  CustomerModel,
  CustomerSchema,
} from '../infra/database/models/Customer';
import { LoginUseCase } from './usecases/login/LoginUseCase';
import { ProfileUseCase } from './usecases/profile/ProfileUseCase';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [CustomerController],
  providers: [LoginUseCase, CustomerRepository, ProfileUseCase],
})
export class CustomerModule {}
