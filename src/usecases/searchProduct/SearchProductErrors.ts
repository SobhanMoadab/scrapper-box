import { Result } from '../../core/Result';
import { UseCaseError } from '../../core/UseCaseError';

export class AgentNotFound extends Result<UseCaseError> {
  constructor() {
    super(false, {
      message: `The given Agent does not exists`,
    } as UseCaseError);
  }
}
