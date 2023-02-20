import { IEventRepository } from '../Customer/repos/IEventRepository.ts';
import { InvalidInput } from '../Customer/usecases/profile/ProfileErrors';
import SaveCommentsUseCase from '../Customer/usecases/saveComments/SaveEvents';
import { SaveEventsDTO } from '../Customer/usecases/saveComments/SaveEventsDTO';

describe('Save comments use case', () => {
  let useCase: SaveCommentsUseCase;
  let eventRepo: IEventRepository;

  beforeEach(() => {
    eventRepo = {
      save: jest.fn(),
    };
    useCase = new SaveCommentsUseCase(eventRepo);
  });

  it('should save events to database', async () => {
    const validDTO: SaveEventsDTO = {
      comments: ['aaa', 'bbb'],
      date: new Date(),
    };
    const result = await useCase.saveEvents(validDTO);
    expect(result.isLeft()).toBeFalsy();
    expect(eventRepo.save).toBeCalled();
  });

  it('should respond with error when dto is invalid', async () => {
    const invalidDTO: SaveEventsDTO = {
      comments: ['', ''],
      date: new Date(),
    };
    const result = await useCase.saveEvents(invalidDTO);
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidInput);
  });
});
