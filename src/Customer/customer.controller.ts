import { Body, Controller, Post, Response } from '@nestjs/common';
import { LoginDTO } from './usecases/login/LoginDTO';
import { Response as ExpressResponse } from 'express';
import { LoginUseCase } from './usecases/login/LoginUseCase';
import { Customer404 } from './usecases/login/LoginErrors';
import {
  InvalidCredential,
  InvalidInput,
} from './usecases/profile/SaveProfileErrors';
import { SaveProfileDTO } from './usecases/profile/SaveProfileDTO';
import { SaveProfileUseCase } from './usecases/profile/SaveProfileUseCase';
import { SaveCommentsDTO } from './usecases/saveComments/SaveCommentsDTO';
import { SaveCommentUseCase } from './usecases/saveComments/SaveComments';

@Controller('customers')
export class CustomerController {
  constructor(
    private readonly profileUseCase: SaveProfileUseCase,
    private readonly loginUseCase: LoginUseCase,
    private readonly saveCommentUseCase: SaveCommentUseCase,
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
    @Body() body: SaveProfileDTO,
    @Response() res: ExpressResponse,
  ) {
    try {
      const result = await this.profileUseCase.saveProfile(body);
      const value = result.value;
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
          case Customer404:
            return res
              .status(400)
              .json({ status: 400, result: error.getErrorValue() });
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
        return res.status(200).json({ status: 200, result: value.getValue() });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: 500, result: 'Something went wrong' });
    }
  }
  @Post('save-comments')
  async saveEvent(
    @Body() body: SaveCommentsDTO,
    @Response() res: ExpressResponse,
  ) {
    console.log(body);
    try {
      const result = await this.saveCommentUseCase.saveComments(body);
      if (result.isLeft()) {
        const error = result.value;
        switch (error.constructor) {
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
          .json({ status: 201, result: 'Successfully saved' });
      }
    } catch (err) {
      return res
        .status(500)
        .json({ status: 500, result: 'Something went wrong' });
    }
  }
}
