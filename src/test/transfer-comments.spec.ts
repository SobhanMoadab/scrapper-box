import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TransferCommentsUseCase } from '../usecases/transferComments/TransferComments';

describe('Transfer comments useCase', () => {
  let useCase: TransferCommentsUseCase;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<TransferCommentsUseCase>(TransferCommentsUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
