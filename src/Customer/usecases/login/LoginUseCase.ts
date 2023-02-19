import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Customer } from '../../domain/Customer';
import { ICustomerRepository } from '../../repos/ICustomerRepository';
import { LoginDTO } from './LoginDTO';
import { Customer404, InvalidInput } from './LoginErrors';
import { sign } from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CustomerRepository } from '../../repos/implementation/mongooseCustomer';
type Response = Either<
  UnexpectedError | InvalidInput | Customer404,
  Result<string>
>;

@Injectable()
export class LoginUseCase {
  constructor(
    @Inject(CustomerRepository) public customerRepo: ICustomerRepository,
  ) {}
  async login(dto: LoginDTO): Promise<Response> {
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
      const token = sign({ ...dto }, process.env.UTILITY_SECRET!, {
        expiresIn: 600,
      });
      return right(Result.ok(token));
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
