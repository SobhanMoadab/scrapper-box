import { BadRequestException } from '@nestjs/common';
import { Result } from '../../core/Result';
import { UseCaseError } from '../../core/UseCaseError';

export class InvalidTransferCommentDTO extends Result<BadRequestException> {
  constructor() {
    super(false, 'Provided dto is not valid');
  }
}
