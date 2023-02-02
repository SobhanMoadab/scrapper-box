import { Either, Result } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { DigikalaCommentVM } from '../fetchComments/FetchCommentDTO';

type Response = Either<
  UnexpectedError | Result<DigikalaCommentVM>,
  Result<any>
>;

export class LoginClientUseCase {
  constructor() {}
  async loginClient() {}
}
