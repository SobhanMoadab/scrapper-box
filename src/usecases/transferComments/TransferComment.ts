import axios from 'axios';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { CONSTANTS } from '../../utils/constants';
import { TransferCommentDTO } from './TransferCommentDTO';
import { InvalidTransferCommentDTO } from './TransferCommentErrors';
import { Injectable } from '@nestjs/common';
type Response = Either<
  InvalidTransferCommentDTO | UnexpectedError | Result<any>,
  Result<void>
>;
@Injectable()
export class TransferCommentUseCase {
  async transferComment(dto: TransferCommentDTO): Promise<Response> {
    try {
      if (!dto.token) {
        return left(new InvalidTransferCommentDTO());
      }
      const postFix = dto.comment.hasOwnProperty('product_id')
        ? CONSTANTS.WORDPRESS_PRODUCT_REVIEWS_POSTFIX
        : CONSTANTS.WORDPRESS_COMMENT_POSTFIX;
      const url = dto.siteUrl + postFix;
      await axios.post(url, JSON.stringify(dto.comment), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dto?.token}`,
        },
      });
      return right(Result.ok());
    } catch (err) {
      console.log('transferComment ~ err:', err);
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
