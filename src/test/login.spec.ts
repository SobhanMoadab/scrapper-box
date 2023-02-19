import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoginDTO } from '../usecases/login/LoginDTO';
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

  it('should respond with error with invalid dto', async () => {
    // given invalid dto
    const invalidDTO: LoginDTO = {
      password: '',
      username: 'test',
    };
    // when i attempt to login
    // i expect result to be instance of error
  });
});
