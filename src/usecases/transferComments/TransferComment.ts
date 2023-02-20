import { BadRequestException } from '@nestjs/common';
import axios from 'axios';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { CONSTANTS } from '../../utils/constants';
import { TransferCommentDTO } from './TransferCommentDTO';
import { InvalidTransferCommentDTO } from './TransferCommentErrors';

type Response = Either<
  InvalidTransferCommentDTO | UnexpectedError | Result<any>,
  Result<void>
>;

export class TransferCommentUseCase {
  async transferComment(dto: TransferCommentDTO): Promise<Response> {
    try {
      if (!dto.token) {
        return left(new InvalidTransferCommentDTO());
      }
      const postFix =
        dto.contentType === 'PRODUCT'
          ? CONSTANTS.WORDPRESS_PRODUCT_REVIEWS_POSTFIX
          : CONSTANTS.WORDPRESS_COMMENT_POSTFIX;
      const url = dto.siteUrl + postFix;
      const result = await axios.post(url, JSON.stringify(dto.comment), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dto?.token}`,
        },
      });
      console.log(
        '🚀 ~ file: TransferComment.ts:36 ~ TransferCommentUseCase ~ result ~ result',
        result.status,
      );
      return right(Result.ok());
    } catch (err) {
      console.log(
        '🚀 ~ file: TransferComment.ts:42 ~ TransferCommentUseCase ~ transferComment ~ err',
        err,
      );
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
