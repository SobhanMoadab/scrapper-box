import { Result } from '../../../core/Result';
import { UseCaseError } from '../../../core/UseCaseError';

export class InvalidInput extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Username or Password is empty`,
    } as UseCaseError);
  }
}

export class Customer404 extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Could not find Customer`,
    } as UseCaseError);
  }
}
