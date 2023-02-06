import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TransferCommentsUseCase } from '../usecases/transferComments/TransferComments';
import { TransferCommentsDTO } from '../usecases/transferComments/TransferCommentsDTO';

describe('Transfer comments useCase', () => {
  let useCase: TransferCommentsUseCase;

  beforeEach(async () => {
    jest.setTimeout(6000);
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<TransferCommentsUseCase>(TransferCommentsUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  // given i provide invalid input, i should get error
  it('should throw badrequest exception, when provided with invalid data', async () => {
    const dto: TransferCommentsDTO = {
      token: '',
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComments(dto);
    // then i expect result to be instance of bad excetion class
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(BadRequestException);
  });
});
