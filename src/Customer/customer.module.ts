import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerController } from './customer.controller';

import { CustomerSchema } from '../shared/database/models/Customer';
import { ProfileSchema } from '../shared/database/models/Profile';
import { EventSchema } from '../shared/database/models/Event';

import { CustomerRepository } from './repos/implementation/mongooseCustomer';
import { ProfileRepository } from './repos/implementation/mongooseProfile';
import { EventRepository } from './repos/implementation/mongooseEvent';

import { LoginUseCase } from './usecases/login/LoginUseCase';
import { SaveCommentUseCase } from './usecases/saveComments/SaveComments';
import { SaveProfileUseCase } from './usecases/profile/SaveProfileUseCase';
import { TasksService } from './task.service';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import { CommentSchema } from '../shared/database/models/Comment';
import { CommentRepository } from './repos/implementation/mongooseComment';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Profile', schema: ProfileSchema },
      { name: 'Event', schema: EventSchema },
      { name: 'Comment', schema: CommentSchema },
    ]),
    TransferCommentUseCase,
  ],
  controllers: [CustomerController],
  providers: [
    CommentRepository,
    CustomerRepository,
    ProfileRepository,
    EventRepository,
    TasksService,
    LoginUseCase,
    TransferCommentUseCase,
    SaveProfileUseCase,
    SaveCommentUseCase,
  ],
})
export class CustomerModule {}
