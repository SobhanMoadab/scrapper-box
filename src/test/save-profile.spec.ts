import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ProfileDTO } from '../Customer/usecases/profile/ProfileDTO';
import {
  InvalidCredential,
  InvalidInput,
} from '../Customer/usecases/profile/ProfileErrors';
import { ProfileUseCase } from '../Customer/usecases/profile/ProfileUseCase';

describe('Profile UseCase', () => {
  let useCase: ProfileUseCase;

  beforeEach(async () => {
    jest.setTimeout(10000);
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<ProfileUseCase>(ProfileUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw error with incomplete input', async () => {
    // Given i provide wrong input
    const dto: ProfileDTO = {
      username: '',
      password: '',
      siteUrl: 'https://urumdental.com',
    };
    // When i attempt to login a client
    const result = await useCase.saveProfile(dto);
    // Then i expect to get error for returned value
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidInput);
  });

  it('should throw error with wrong credential', async () => {
    // Given i provide wrong input
    const dto: ProfileDTO = {
      username: 'test',
      password: 'test',
      siteUrl: 'https://urumdental.com',
    };
    // When i attempt to login a client
    const result = await useCase.saveProfile(dto);
    console.log('🚀 ~ file: login-client.spec.ts:50 ~ it ~ result', result);
    // Then i expect to get error for returned value
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidCredential);
  });

  it('should login to the url given and receive token', async () => {
    // Given i provide correct input
    const dto: ProfileDTO = {
      username: process.env.URUM_USERNAME!,
      password: process.env.URUM_PASSWORD!,
      siteUrl: 'https://urumdental.com',
    };
    // When i attempt to login a client
    const result = await useCase.saveProfile(dto);
    // Then i expect to get token as a result
    expect(result.isLeft()).toBeFalsy();
  });
});
