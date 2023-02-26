import { ObjectId } from 'mongoose';
import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';
import { UniqueEntityID } from '../../core/UniqueEntityID';
import {
  WordPressPostComment,
  WordPressProductComment,
} from '../../usecases/transferComments/TransferCommentDTO';

export type EventProps = {
  status?: boolean;
  date: string;
  profileId: string | ObjectId;
};

export class Event extends Entity<EventProps> {
  get eventId(): string {
    return this._id.toString();
  }
  constructor(props: EventProps, id?: string) {
    super(props, id);
  }

  static create(props: EventProps, id?: string): Result<Event> {
    const event = new Event(props, id);
    return Result.ok(event);
  }
}
