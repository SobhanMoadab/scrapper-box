import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoginClientUseCase } from '../usecases/loginClient/LoginClient';

describe('LoginClientUseCase', () => {
  let useCase: LoginClientUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<LoginClientUseCase>(LoginClientUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
