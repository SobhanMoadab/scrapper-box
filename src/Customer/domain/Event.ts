import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';
import { Profile } from './Profile';

export type EventProps = {
  comments: string[];
  status?: boolean;
  date: Date;
};

export class Event extends Entity<EventProps> {
  constructor(props: EventProps) {
    super(props);
  }

  static create(props: EventProps): Result<Event> {
    if (!props.comments || !props.date) {
      return Result.fail('invalid event props');
    }
    const event = new Event(props);
    return Result.ok(event);
  }
}
