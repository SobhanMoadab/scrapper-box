import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repos/implementation/mongooseCustomer';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema } from '../shared/database/models/Customer';
import { LoginUseCase } from './usecases/login/LoginUseCase';
import { ProfileUseCase } from './usecases/profile/ProfileUseCase';
import { ProfileSchema } from '../shared/database/models/Profile';
import { ProfileRepository } from './repos/implementation/mongooseProfile';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Profile', schema: ProfileSchema },
    ]),
  ],
  controllers: [CustomerController],
  providers: [
    LoginUseCase,
    CustomerRepository,
    ProfileUseCase,
    ProfileRepository,
  ],
})
export class CustomerModule {}
