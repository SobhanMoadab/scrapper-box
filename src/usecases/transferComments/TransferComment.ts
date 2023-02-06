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

      const url = dto.baseUrl + CONSTANTS.WORDPRESS_COMMENT_POSTFIX;
      const result = await axios.post(url, JSON.stringify(dto.comment), {
        headers: {
          'Content-Type': 'application/json',
          Authorization: dto?.token,
        },
      });
      console.log({ 1111: result.data });
      return right(Result.ok());
    } catch (err) {
      console.log({ err });
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
