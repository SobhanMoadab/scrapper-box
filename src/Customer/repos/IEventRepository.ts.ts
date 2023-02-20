import { Event } from '../domain/Event';

export interface IEventRepository {
  save(event: Event): Promise<void>;
}
