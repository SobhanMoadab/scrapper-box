import { Customer } from '../domain/Customer';

export interface ICustomerRepository {
  findByUsername(username: string): Promise<Customer>;
}
