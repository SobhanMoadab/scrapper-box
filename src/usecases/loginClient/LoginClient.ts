import { ClientAccount } from '../../ClientAccount';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { DigikalaCommentVM } from '../fetchComments/FetchCommentDTO';
import { LoginClientDTO } from './LoginClientDTO';

type Response = Either<UnexpectedError | Result<any>, Result<void>>;

export class LoginClientUseCase {
  constructor() {}
  async loginClient({
    username,
    password,
    siteUrl,
  }: LoginClientDTO): Promise<Response> {
    let client: ClientAccount;

    try {
      const clientAccOrError = ClientAccount.create({ username, password });
      if (clientAccOrError.isFailure) {
        return left(clientAccOrError);
      }
      client = clientAccOrError.getValue();
      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
