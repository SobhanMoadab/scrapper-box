import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';

export type CustomerProps = {
  username: string;
  password: string;
};

export class Customer extends Entity<CustomerProps> {
  constructor(props: CustomerProps) {
    super(props);
  }

  static create(props: CustomerProps): Result<Customer> {
    if (!props.password || !props.username) {
      return Result.fail('invalid customer props');
    }
    const customer = new Customer(props);
    return Result.ok(customer);
  }
}
