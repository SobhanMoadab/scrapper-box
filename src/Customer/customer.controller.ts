import { Body, Controller, Post, Response } from '@nestjs/common';
import { LoginDTO } from './usecases/login/LoginDTO';
import { Response as ExpressResponse } from 'express';
import { LoginUseCase } from './usecases/login/LoginUseCase';
import { Customer404 } from './usecases/login/LoginErrors';
import {
  InvalidCredential,
  InvalidInput,
} from './usecases/profile/ProfileErrors';
import { ProfileDTO } from './usecases/profile/ProfileDTO';
import { ProfileUseCase } from './usecases/profile/ProfileUseCase';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly profileUseCase: ProfileUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}
  @Post('login')
  async login(@Body() body: LoginDTO, @Response() res: ExpressResponse) {
    try {
      const result = await this.loginUseCase.login({
        password: body.password,
        username: body.username,
      });
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case Customer404:
            return res
              .status(400)
              .json({ status: 400, result: error.getErrorValue() });
          case InvalidInput:
            return res
              .status(400)
              .json({ status: 400, result: error.getErrorValue() });
          default:
            return res
              .status(500)
              .json({ status: 500, result: error.getErrorValue() });
        }
      } else {
        return res
          .status(201)
          .json({ status: 201, result: result.value.getValue() });
      }
    } catch (err) {
      return res.status(500).json({ status: 500, msg: 'Something went wrong' });
    }
  }
  @Post('profile')
  async loginClient(
    @Body() body: ProfileDTO,
    @Response() res: ExpressResponse,
  ) {
    try {
      const result = await this.profileUseCase.saveProfile({
        username: body.username,
        password: body.password,
        siteUrl: body.siteUrl,
      });
      const value = result.value.getValue();
      if (result.isLeft()) {
        const error = result.value;

        switch (error.constructor) {
          case InvalidCredential:
            return res
              .status(400)
              .json({ status: 400, result: error.getErrorValue() });
          default:
            return res
              .status(500)
              .json({ status: 500, result: error.getErrorValue() });
        }
      } else {
        return res.status(200).json({ status: 200, result: value });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: 500, result: 'Something went wrong' });
    }
  }
}
