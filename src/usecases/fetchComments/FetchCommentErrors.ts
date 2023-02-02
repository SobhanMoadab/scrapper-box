import { Result } from '../../core/Result';
import { UseCaseError } from '../../core/UseCaseError';

export class ProductNotFound extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `The given product does not exists`,
    } as UseCaseError);
  }
}
