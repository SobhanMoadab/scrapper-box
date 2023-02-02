import { Entity } from './core/Entity';
import { Guard } from './core/Guard';
import { Result } from './core/Result';
import { UniqueEntityID } from './core/UniqueEntityID';

export type ClientAccountProps = {
  username: string;
  password: string;
};
export class ClientAccount extends Entity<ClientAccountProps> {
  constructor(props: ClientAccountProps, id?: UniqueEntityID) {
    super(props, id);
  }
  public static create(props: ClientAccountProps): Result<ClientAccount> {
    const guardResult = Guard.againstNullOrUndefinedBulk([
      {
        argument: props.username,
        argumentName: 'Username',
      },
      {
        argument: props.password,
        argumentName: 'Password',
      },
    ]);
    if (guardResult.isFailure) {
      return Result.fail<ClientAccount>(guardResult.getValue());
    }
    const clientAccount = new ClientAccount({ ...props });
    return Result.ok<ClientAccount>(clientAccount);
  }
}
