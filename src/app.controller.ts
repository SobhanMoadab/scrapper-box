import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { SearchProductDTO } from './usecases/searchProduct/SearchProductDTO';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { FetchCommentDTO } from './usecases/fetchComments/FetchCommentDTO';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';

@Controller()
export class AppController {
  constructor(
    private readonly searchProductUsecase: SearchProductUseCase,
    private readonly fetchCommentsUsecase: FetchCommentsUseCase,
  ) {}

  @Get('search')
  async search(@Query() query: SearchProductDTO) {
    // const agent = await this.useCase.findAgent(query.searchTarget)
    // if (!agent) throw new Error()
    const queryResult = await this.searchProductUsecase.fetchProductFromAgent({
      searchAgent: query.searchAgent,
      searchTitle: query.searchTitle,
    });
    return queryResult.value.getValue();
  }

  @Get('fetch-comments')
  async fetchComments(@Query() query: FetchCommentDTO) {
    const queryResult = await this.fetchCommentsUsecase.fetchCommentsFromTarget(
      {
        productId: query.productId,
        searchAgent: query.searchAgent,
      },
    );
    return queryResult.value.getValue();
  }
}
