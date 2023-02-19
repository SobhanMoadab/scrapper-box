import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Customer } from '../../domain/Customer';
import { ICustomerRepository } from '../../repos/ICustomerRepository';
import { LoginDTO } from './LoginDTO';
import { Customer404, InvalidInput } from './LoginErrors';

type Response = Either<
  UnexpectedError | InvalidInput | Customer404,
  Result<void>
>;
export class LoginUseCase {
  constructor(public customerRepo: ICustomerRepository) {}
  async execute(dto: LoginDTO): Promise<Response> {
    try {
      let customer: Customer;
      try {
        customer = await this.customerRepo.findByUsername(dto.username);
      } catch (err) {
        return left(new Customer404());
      }
      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
