import { Body, Controller, Get, Response, Post, Query } from '@nestjs/common';
import { SearchProductDTO } from './usecases/searchProduct/SearchProductDTO';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { FetchCommentDTO } from './usecases/fetchComments/FetchCommentDTO';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { AgentNotFound } from './usecases/searchProduct/SearchProductErrors';
import { ProductNotFound } from './usecases/fetchComments/FetchCommentErrors';
import { Response as ExpressResponse } from 'express';

@Controller()
export class AppController {
  constructor(
    private readonly searchProductUseCase: SearchProductUseCase,
    private readonly fetchCommentsUseCase: FetchCommentsUseCase,
  ) {}

  @Get('search')
  async search(
    @Query() query: SearchProductDTO,
    @Response() res: ExpressResponse,
  ) {
    const result = await this.searchProductUseCase.fetchProductFromAgent({
      searchAgent: query.searchAgent,
      searchTitle: query.searchTitle,
    });

    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case AgentNotFound:
          return res
            .status(400)
            .json({ status: 400, result: error.getErrorValue() });
        default:
          return res
            .status(500)
            .json({ status: 500, result: error.getErrorValue() });
      }
    } else {
      return res
        .status(200)
        .json({ status: 200, result: result.value.getValue() });
    }
  }

  @Get('fetch-comments')
  async fetchComments(
    @Query() query: FetchCommentDTO,
    @Response() res: ExpressResponse,
  ) {
    const result = await this.fetchCommentsUseCase.fetchCommentsFromTarget({
      productId: query.productId,
      searchAgent: query.searchAgent,
    });
    if (result.isLeft()) {
      const error = result.value;

      switch (error.constructor) {
        case AgentNotFound:
          return res
            .status(400)
            .json({ status: 400, result: error.getErrorValue() });
        case ProductNotFound:
          return res
            .status(400)
            .json({ status: 400, result: error.getErrorValue() });
        default:
          return res
            .status(500)
            .json({ status: 500, result: error.getErrorValue() });
      }
    } else {
      return res
        .status(200)
        .json({ status: 200, result: result.value.getValue() });
    }
  }
  @Post('login-client')
  async loginClient(@Body() body: any) {
    throw new Error();
  }
}
