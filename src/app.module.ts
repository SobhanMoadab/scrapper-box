import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [SearchProductUseCase],
})
export class AppModule {}
