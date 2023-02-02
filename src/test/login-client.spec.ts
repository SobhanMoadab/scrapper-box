import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { LoginClientUseCase } from '../usecases/loginClient/LoginClient';
import { LoginClientDTO } from '../usecases/loginClient/LoginClientDTO';
import { InvalidCredential } from '../usecases/loginClient/LoginClientErrors';

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
    // Then i expect to get error for returned value
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidCredential);
  });

  it('should login to the url given and receive token', async () => {
    // Given i provide correct input
    const dto: LoginClientDTO = {
      username: 'moadab',
      password: 'Tx4%GeX7TY#75NmVjBtnul*c',
      siteUrl: 'https://urumdental.com',
    };
    // When i attempt to login a client
    const result = await useCase.loginClient(dto);
    // Then i expect to get token as a result
    expect(result.isLeft()).toBeFalsy();
    expect(result.value.getValue()).toHaveProperty('token');
  });
});
