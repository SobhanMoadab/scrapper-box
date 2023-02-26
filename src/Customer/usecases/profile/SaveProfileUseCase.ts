import { Inject } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Profile } from '../../domain/Profile';
import { ProfileRepository } from '../../repos/implementation/mongooseProfile';
import { IProfileRepository } from '../../repos/IProfileRepository';
import { SaveProfileDTO } from './SaveProfileDTO';
import { InvalidCredential } from './SaveProfileErrors';
import { genSalt, genSaltSync, hashSync } from 'bcrypt';

type Response = Either<
  InvalidCredential | UnexpectedError | Result<any>,
  Result<string>
>;

export class SaveProfileUseCase {
  constructor(
    @Inject(ProfileRepository) public profileRepo: IProfileRepository,
  ) {}
  async saveProfile({
    siteUsername,
    sitePassword,
    siteUrl,
    commentType,
    publishTime,
    commentLimit,
  }: SaveProfileDTO): Promise<Response> {
    try {
      let axiosResult: AxiosResponse;

      const wordpressPostfix = '/wp-json/jwt-auth/v1/token';
      const url = siteUrl + wordpressPostfix;

      try {
        axiosResult = await axios.post(
          url,
          { username: siteUsername, password: sitePassword },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
      } catch (err) {
        return left(new InvalidCredential());
      }
      const salt = genSaltSync(10);
      const profile = Profile.create({
        commentType,
        customerId: '63f23039f1765d0e1a48bb43',
        sitePassword: hashSync(sitePassword, salt),
        siteUrl,
        siteUsername,
        publishTime,
        commentLimit,
        token: axiosResult.data.token,
      }).getValue();

      await this.profileRepo.save(profile);
      return right(Result.ok(axiosResult.data.token));
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
