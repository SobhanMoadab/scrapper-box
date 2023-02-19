import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoginDTO } from '../Customer/usecases/login/LoginDTO';
import { Customer404 } from '../Customer/usecases/login/LoginErrors';
import { LoginUseCase } from '../Customer/usecases/login/LoginUseCase';
import { InvalidInput } from '../usecases/loginClient/LoginClientErrors';

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

  it('should respond with error if user does not exists', async () => {
    // given invalid dto
    const invalidDTO: LoginDTO = {
      password: '',
      username: 'test',
    };
    // when i attempt to login
    const result = await useCase.execute(invalidDTO);
    // i expect result to be instance of error
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(Customer404);
  });
});
