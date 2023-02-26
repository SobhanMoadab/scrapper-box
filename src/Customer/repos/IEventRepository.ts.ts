import {
  WordPressPostComment,
  WordPressProductComment,
} from '../../usecases/transferComments/TransferCommentDTO';
import { Event } from '../domain/Event';

export interface IEventRepository {
  save(event: Event): Promise<void>;
  // findUnfinishedEvent(profileId: string): Promise<Event>;
  removeCommentFromEvent(
    eventId: string,
    comment: WordPressPostComment | WordPressProductComment,
  ): Promise<void>;
  exists(eventId: string): Promise<boolean>;
}
