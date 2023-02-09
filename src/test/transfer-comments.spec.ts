import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import { TransferCommentDTO } from '../usecases/transferComments/TransferCommentDTO';
import { InvalidTransferCommentDTO } from '../usecases/transferComments/TransferCommentErrors';
import { CONSTANTS } from '../utils/constants';

describe('Transfer comments useCase', () => {
  let useCase: TransferCommentUseCase;
  let randomString: string;

  beforeEach(async () => {
    jest.setTimeout(6000);
    randomString = (Math.random() + 1).toString(36).substring(7);
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
  it('should throw bad request exception, when provided with invalid data', async () => {
    const dto: TransferCommentDTO = {
      token: '',
      siteUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: `${randomString}@gmail.com`,
        author_name: 'sobhan',
        content: 'test',
        post: '3860',
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);
    // then i expect result to be instance of bad excetion class
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidTransferCommentDTO);
  });

  it('should respond correctly, when provided with valid data', async () => {
    const dto: TransferCommentDTO = {
      token: process.env.URUM_TOKEN!,
      siteUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: `${randomString}@gmail.com`,
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
