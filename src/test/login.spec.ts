import { LoginDTO } from '../Customer/usecases/login/LoginDTO';
import { Customer404 } from '../Customer/usecases/login/LoginErrors';
import { LoginUseCase } from '../Customer/usecases/login/LoginUseCase';
import { InvalidInput } from '../Customer/usecases/login/LoginErrors';
import { ICustomerRepository } from '../Customer/repos/ICustomerRepository';
import { Customer } from '../Customer/domain/Customer';
import { verify } from 'jsonwebtoken';

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
    const result = await useCase.login(invalidDTO);
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
    const result = await useCase.login(invalidDTO);
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(Customer404);
  });

  it('should respond with token if dto is valid', async () => {
    const validDTO: LoginDTO = {
      password: 'aaa',
      username: 'aaa',
    };

    customerRepo.exists = jest.fn(() => Promise.resolve(true));

    const result = await useCase.login(validDTO);
    const token = result.value.getValue();
    const result2 = verify(token as string, process.env.UTILITY_SECRET!);

    expect(result2).toEqual(
      expect.objectContaining({
        username: validDTO.username,
        password: validDTO.password,
      }),
    );
    expect(result.isLeft()).toBeFalsy();
  });
});
