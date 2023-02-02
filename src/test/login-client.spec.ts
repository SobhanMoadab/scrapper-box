import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ClientAccount } from '../ClientAccount';
import { LoginClientUseCase } from '../usecases/loginClient/LoginClient';
import { LoginClientDTO } from '../usecases/loginClient/LoginClientDTO';

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

  it('should throw error with wrong input', async () => {
    // Given i provide wrong input
    const dto: LoginClientDTO = {
      username: 'test',
      password: '',
      siteUrl: 'test',
    };
    // When i attempt to login a client
    const result = await useCase.loginClient(dto);
    // then i expect to get error for returned value
    expect(result.isRight()).toBeFalsy();
  });

  it('should login to the url given', async () => {});
});
