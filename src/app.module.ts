import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { LoginClientUseCase } from './usecases/loginClient/LoginClient';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { ConfigModule } from '@nestjs/config';
import { TransferCommentUseCase } from './usecases/transferComments/TransferComment';
import { MongooseModule } from '@nestjs/mongoose';

import { CustomerModule } from './Customer/customer.module';

@Module({
  imports: [
    CustomerModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot('mongodb://127.0.0.1/utility-box'),
  ],
  controllers: [AppController],
  providers: [
    SearchProductUseCase,
    FetchCommentsUseCase,
    LoginClientUseCase,
    TransferCommentUseCase,
  ],
})
export class AppModule {}
