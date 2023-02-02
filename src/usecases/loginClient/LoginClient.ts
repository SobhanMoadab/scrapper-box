import axios from 'axios';
import { ClientAccount } from '../../ClientAccount';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { LoginClientDTO } from './LoginClientDTO';
import { InvalidCredential, InvalidInput } from './LoginClientErrors';

type Response = Either<
  InvalidCredential | UnexpectedError | Result<any>,
  Result<void>
>;

export class LoginClientUseCase {
  async loginClient({
    username,
    password,
    siteUrl,
  }: LoginClientDTO): Promise<Response> {
    try {
      try {
        ClientAccount.create({ username, password });
      } catch (err) {
        return left(new InvalidInput());
      }
      const wordpressPostfix = '/wp-json/jwt-auth/v1/token';
      const url = siteUrl + wordpressPostfix;

      try {
        await axios.post(
          url,
          { username, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        // save token to database
      } catch (err) {
        return left(new InvalidCredential());
      }

      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
