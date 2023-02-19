import { LoginDTO } from '../Customer/usecases/login/LoginDTO';
import { Customer404 } from '../Customer/usecases/login/LoginErrors';
import { LoginUseCase } from '../Customer/usecases/login/LoginUseCase';
import { InvalidInput } from '../Customer/usecases/login/LoginErrors';
import { ICustomerRepository } from '../Customer/repos/ICustomerRepository';
import { Customer } from '../Customer/domain/Customer';

describe('login to utility-box', () => {
  let useCase: LoginUseCase;
  let customerRepo: ICustomerRepository;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [LoginUseCase],
    //   imports: [AppModule],
    // }).compile();
    customerRepo = {
      exists: jest.fn(),
    };
    useCase = new LoginUseCase(customerRepo);
    // useCase = module.get<LoginUseCase>(LoginUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should respond with error if dto is incorrect', async () => {
    const invalidDTO: LoginDTO = {
      password: 'test',
      username: '',
    };
    // when i attempt to login
    const result = await useCase.execute(invalidDTO);
    // i expect result to be instance of error
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidInput);
  });

  it('should respond with error if user does not exists', async () => {
    customerRepo.exists = jest.fn(() => Promise.reject());
    const invalidDTO: LoginDTO = {
      password: 'test',
      username: 'test',
    };
    const result = await useCase.execute(invalidDTO);
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(Customer404);
  });

  it('should respond with token if dto is valid', async () => {
    const valid: LoginDTO = {
      password: 'aaa',
      username: 'aaa',
    };

    customerRepo.exists = jest.fn(() => Promise.resolve(true));

    const result = await useCase.execute(valid);
    expect(result.isLeft()).toBeFalsy();
  });
});
