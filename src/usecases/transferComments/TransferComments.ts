import { BadRequestException } from '@nestjs/common';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { TransferCommentsDTO } from './TransferCommentsDTO';

type Response = Either<
  BadRequestException | UnexpectedError | Result<any>,
  Result<void>
>;
export class TransferCommentsUseCase {
  async transferComments(dto: TransferCommentsDTO): Promise<Response> {
    try {
      if (!dto.token) {
        return left(new BadRequestException());
      }

      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
