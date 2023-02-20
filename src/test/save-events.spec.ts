import { IEventRepository } from '../Customer/repos/IEventRepository.ts';
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
      status: true,
    };
    const result = await useCase.saveEvents(validDTO);
    expect(result.isLeft()).toBeFalsy();
    expect(eventRepo.save).toBeCalled();
  });
});
