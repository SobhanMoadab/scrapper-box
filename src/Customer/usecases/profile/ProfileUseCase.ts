import axios, { AxiosResponse } from 'axios';
import { ClientAccount } from '../../../ClientAccount';
import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { ProfileDTO } from './ProfileDTO';
import { InvalidCredential, InvalidInput } from './ProfileErrors';

type Response = Either<
  InvalidCredential | UnexpectedError | Result<any>,
  Result<string>
>;

export class ProfileUseCase {
  async saveProfile({
    username,
    password,
    siteUrl,
  }: ProfileDTO): Promise<Response> {
    try {
      try {
        ClientAccount.create({ username, password });
      } catch (err) {
        return left(new InvalidInput());
      }
      const wordpressPostfix = '/wp-json/jwt-auth/v1/token';
      const url = siteUrl + wordpressPostfix;
      let axiosResult: AxiosResponse;
      try {
        axiosResult = await axios.post(
          url,
          { username, password },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (err) {
        return left(new InvalidCredential());
      }

      return right(Result.ok(axiosResult.data.token));
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
