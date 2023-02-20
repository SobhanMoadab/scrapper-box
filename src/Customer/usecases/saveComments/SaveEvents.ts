import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Event } from '../../domain/Event';
import { IEventRepository } from '../../repos/IEventRepository.ts';
import { InvalidInput } from '../profile/ProfileErrors';
import { SaveEventsDTO } from './SaveEventsDTO';

type Response = Either<UnexpectedError | Result<any>, Result<void>>;

export default class SaveCommentsUseCase {
  constructor(public eventRepo: IEventRepository) {}

  async saveEvents(dto: SaveEventsDTO): Promise<Response> {
    const eventOrError = Event.create({
      comments: dto.comments,
      date: dto.date,
    });
    if (eventOrError.isFailure) {
      return left(new InvalidInput());
    }
    const event = eventOrError.getValue();
    try {
      await this.eventRepo.save(event);
      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
