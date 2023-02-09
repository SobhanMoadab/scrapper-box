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

      const url = dto.siteUrl + CONSTANTS.WORDPRESS_COMMENT_POSTFIX;
      await axios.post(url, JSON.stringify(dto.comment), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${dto?.token}`,
        },
      });
      return right(Result.ok());
    } catch (err) {
      console.log({ err });
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
