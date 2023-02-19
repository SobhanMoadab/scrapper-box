import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoginUseCase } from '../usecases/login/LoginUseCase';

describe('login to utility-box', () => {
  let useCase: LoginUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LoginUseCase],
      imports: [AppModule],
    }).compile();

    useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });
});
