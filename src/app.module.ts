import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SearchProductUseCase, FetchCommentsUseCase],
})
export class AppModule {}
