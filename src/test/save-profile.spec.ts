import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { Customer } from '../Customer/domain/Customer';
import { ICustomerRepository } from '../Customer/repos/ICustomerRepository';
import { ProfileDTO } from '../Customer/usecases/profile/ProfileDTO';
import {
  InvalidCredential,
  InvalidInput,
} from '../Customer/usecases/profile/ProfileErrors';
import { ProfileUseCase } from '../Customer/usecases/profile/ProfileUseCase';

describe('save profile', () => {
  let useCase: ProfileUseCase;
  let customerRepo: ICustomerRepository;

  beforeEach(async () => {
    customerRepo = {
      exists: jest.fn(),
      findByUsername: jest.fn(),
      save: jest.fn(),
    };
    useCase = new ProfileUseCase(customerRepo);
    //   jest.setTimeout(10000);
    //   const module: TestingModule = await Test.createTestingModule({
    //     providers: [],
    //     imports: [AppModule],
    //   }).compile();

    //   useCase = module.get<ProfileUseCase>(ProfileUseCase);
  });

  // it('useCase should be defined', () => {
  //   expect(useCase).toBeDefined();
  // });

  // it('should throw error with incomplete input', async () => {
  //   // Given i provide wrong input
  //   const dto: ProfileDTO = {
  //     username: '',
  //     password: '',
  //     siteUrl: 'https://urumdental.com',
  //     commentType: 'PRODUCT',
  //   };
  //   // When i attempt to login a client
  //   const result = await useCase.saveProfile(dto);
  //   // Then i expect to get error for returned value
  //   expect(result.isRight()).toBeFalsy();
  //   expect(result.value).toBeInstanceOf(InvalidInput);
  // });

  // it('should throw error with wrong credential', async () => {
  //   // Given i provide wrong input
  //   const dto: ProfileDTO = {
  //     username: 'test',
  //     password: 'test',
  //     siteUrl: 'https://urumdental.com',
  //     commentType: 'PRODUCT',
  //   };
  //   // When i attempt to login a client
  //   const result = await useCase.saveProfile(dto);
  //   console.log('🚀 ~ file: login-client.spec.ts:50 ~ it ~ result', result);
  //   // Then i expect to get error for returned value
  //   expect(result.isRight()).toBeFalsy();
  //   expect(result.value).toBeInstanceOf(InvalidCredential);
  // }, 12_000);

  it('should save profile and return token', async () => {
    const customer = Customer.create({
      password: 'test',
      username: 'test',
    }).getValue();

    customerRepo.findByUsername = jest.fn(() => Promise.resolve(customer));

    const dto: ProfileDTO = {
      username: process.env.URUM_USERNAME!,
      password: process.env.URUM_PASSWORD!,
      siteUrl: 'https://urumdental.com',
      commentType: 'PRODUCT',
    };
    // When i attempt to login a client
    const result = await useCase.saveProfile(dto);
    // Then i expect to get token as a result
    expect(result.isLeft()).toBeFalsy();
    expect(customerRepo.save).toBeCalled();
  }, 12_000);
});
