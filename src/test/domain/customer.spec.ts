import { Customer, CustomerProps } from '../../Customer/domain/Customer';

describe('Customer', () => {
  let customer: Customer;

  it('should create customer with valid dto', () => {
    const customerProps: CustomerProps = {
      password: 'test',
      username: 'test',
    };
    const result = Customer.create(customerProps);
    expect(result.isFailure).toBeFalsy();
    expect(result.getValue()).toBeInstanceOf(Customer);
  });
});
