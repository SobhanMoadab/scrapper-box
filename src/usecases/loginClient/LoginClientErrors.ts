import { Result } from '../../core/Result';
import { UseCaseError } from '../../core/UseCaseError';

export class InvalidCredential extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Username or Password is incorrect`,
    } as UseCaseError);
  }
}
