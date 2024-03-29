import { Body, Controller, Get, Response, Post, Query } from '@nestjs/common';
import { SearchProductDTO } from './usecases/searchProduct/SearchProductDTO';
import { SearchProductUseCase } from './usecases/searchProduct/SearchProduct';
import { FetchCommentDTO } from './usecases/fetchComments/FetchCommentDTO';
import { FetchCommentsUseCase } from './usecases/fetchComments/FetchComment';
import { AgentNotFound } from './usecases/searchProduct/SearchProductErrors';
import { ProductNotFound } from './usecases/fetchComments/FetchCommentErrors';
import { Response as ExpressResponse } from 'express';
import { InvalidCredential } from './Customer/usecases/profile/SaveProfileErrors';
import { TransferCommentDTO } from './usecases/transferComments/TransferCommentDTO';
import { TransferCommentUseCase } from './usecases/transferComments/TransferComment';
import { InvalidTransferCommentDTO } from './usecases/transferComments/TransferCommentErrors';
@Controller()
export class AppController {
  constructor(
    private readonly searchProductUseCase: SearchProductUseCase,
    private readonly fetchCommentsUseCase: FetchCommentsUseCase,
    private readonly transferCommentUseCase: TransferCommentUseCase,
  ) {}

  @Get('search')
  async search(
    @Query() query: SearchProductDTO,
    @Response() res: ExpressResponse,
  ) {
    try {
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
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Something went wrong' });
    }
  }

  @Get('fetch-comments')
  async fetchComments(
    @Query() query: FetchCommentDTO,
    @Response() res: ExpressResponse,
  ) {
    try {
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
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Something went wrong' });
    }
  }

  @Post('transfer-comment')
  async transferComment(
    @Body() body: TransferCommentDTO,
    @Response() res: ExpressResponse,
  ) {
    try {
      const result = await this.transferCommentUseCase.transferComment({
        siteUrl: body.siteUrl,
        comment: body.comment,
        token: body.token,
        contentType: body.contentType,
      });
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case InvalidTransferCommentDTO:
            return res
              .status(400)
              .json({ status: 400, result: error.getErrorValue() });
          default:
            return res
              .status(500)
              .json({ status: 500, result: error.getErrorValue() });
        }
      } else {
        return res.status(200).json({ status: 200, result: 'Successful' });
      }
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Something went wrong' });
    }
  }
}
