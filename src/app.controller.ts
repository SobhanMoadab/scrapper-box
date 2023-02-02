import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { SearchProductDTO } from './usecases/searchProduct/SearchProductDTO';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';

@Controller()
export class AppController {
  constructor(private readonly useCase: SearchProductUseCase) {}

  // user search for a product with dto like
  // {
  //   target: 'digikala'
  //   query: 'iphone13'
  // } and i return bunch of result

  @Get('search')
  async search(@Query() query: SearchProductDTO) {
    // const agent = await this.useCase.findAgent(query.searchTarget)
    // if (!agent) throw new Error()
    const queryResult = await this.useCase.fetchProductFromAgent({
      searchAgent: query.searchAgent,
      searchTitle: query.searchTitle,
    });
    return queryResult.value.getValue();
  }
}
