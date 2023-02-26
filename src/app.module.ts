import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { ConfigModule } from '@nestjs/config';
import { TransferCommentUseCase } from './usecases/transferComments/TransferComment';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './Customer/customer.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    CustomerModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1/utility-box'),
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [
    SearchProductUseCase,
    FetchCommentsUseCase,
    TransferCommentUseCase,
  ],
})
export class AppModule {}
