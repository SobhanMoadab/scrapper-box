import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import { TransferCommentDTO } from '../usecases/transferComments/TransferCommentDTO';
import { CONSTANTS } from '../utils/constants';

describe('Transfer comments useCase', () => {
  let useCase: TransferCommentUseCase;

  beforeEach(async () => {
    jest.setTimeout(6000);
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<TransferCommentUseCase>(TransferCommentUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  // given i provide invalid input, i should get error
  it('should throw badrequest exception, when provided with invalid data', async () => {
    const dto: TransferCommentDTO = {
      token: '',
      baseUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: 's12@test.com',
        author_name: 'sobhan',
        content: 'test',
        post: '3860',
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);
    // then i expect result to be instance of bad excetion class
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(BadRequestException);
  });

  it('should respond correctly, when provided with valid data', async () => {
    const dto: TransferCommentDTO = {
      token: 'test',
      baseUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: 'sobh@test.com',
        author_name: 'sobhan',
        content: 'test',
        post: '3860',
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);
    // then i expect result to be correct
    expect(result.isLeft()).toBeFalsy();
  });
});
