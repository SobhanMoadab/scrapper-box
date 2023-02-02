import { ClientAccount } from '../../ClientAccount';
import { Guard } from '../../core/Guard';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { LoginClientDTO } from './LoginClientDTO';
import { InvalidCredential } from './LoginClientErrors';

type Response = Either<
  InvalidCredential | UnexpectedError | Result<any>,
  Result<void>
>;

export class LoginClientUseCase {
  constructor() {}
  async loginClient({
    username,
    password,
    siteUrl,
  }: LoginClientDTO): Promise<Response> {
    let client: ClientAccount;

    try {
      try {
        const clientAccOrError = ClientAccount.create({ username, password });

        client = clientAccOrError.getValue();
      } catch (err) {
        return left(new InvalidCredential());
      }

      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
