import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Customer } from '../../domain/Customer';
import { ICustomerRepository } from '../../repos/ICustomerRepository';
import { LoginDTO } from './LoginDTO';
import { Customer404, InvalidInput } from './LoginErrors';
import { sign } from 'jsonwebtoken';
type Response = Either<
  UnexpectedError | InvalidInput | Customer404,
  Result<string>
>;
export class LoginUseCase {
  constructor(public customerRepo: ICustomerRepository) {}
  async execute(dto: LoginDTO): Promise<Response> {
    let customer: Customer;

    const customerOrError = Customer.create(dto);
    if (customerOrError.isFailure) {
      return left(new InvalidInput());
    }

    try {
      customer = customerOrError.getValue();

      try {
        const isExists = await this.customerRepo.exists(
          customer.props.username,
        );
        if (!isExists) return left(new Customer404());
      } catch (err) {
        return left(new Customer404());
      }
      const token = sign(customer.props, process.env.UTILITY_SECRET!, {
        expiresIn: 600,
      });
      return right(Result.ok(token));
    } catch (err) {
      console.log(1111, err);
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
