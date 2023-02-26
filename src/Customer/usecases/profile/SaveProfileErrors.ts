import { Result } from '../../../core/Result';
import { UseCaseError } from '../../../core/UseCaseError';

export class InvalidInput extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Input is not valid`,
    } as UseCaseError);
  }
}
export class Profile404 extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Could not find profile`,
    } as UseCaseError);
  }
}
export class InvalidCredential extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `Could not login with provided credential`,
    } as UseCaseError);
  }
}
