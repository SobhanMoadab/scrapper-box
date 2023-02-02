import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { LoginClientUseCase } from './usecases/loginClient/LoginClient';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [SearchProductUseCase, FetchCommentsUseCase, LoginClientUseCase],
})
export class AppModule {}
