import { Identifier } from './Identifier';
import * as crypto from 'crypto';

export class UniqueEntityID extends Identifier<string | number> {
  constructor(id?: string) {
    super(id ? id : crypto.randomUUID());
  }
}
