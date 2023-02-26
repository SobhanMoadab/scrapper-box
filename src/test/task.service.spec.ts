import { IEventRepository } from '../Customer/repos/IEventRepository.ts';
import { IProfileRepository } from '../Customer/repos/IProfileRepository';
import { TasksService } from '../Customer/task.service';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';

describe('Task service', () => {
  let taskService: TasksService;
  let eventRepo: IEventRepository;
  let profileRepo: IProfileRepository;
  let transferUseCase: TransferCommentUseCase;

  beforeEach(() => {
    eventRepo = {
      exists: jest.fn(),
      findUnfinishedEvent: jest.fn(),
      removeCommentFromEvent: jest.fn(),
      save: jest.fn(),
    };
    profileRepo = {
      findByCustomerId: jest.fn(),
      save: jest.fn(),
    };
    transferUseCase = new TransferCommentUseCase();
    taskService = new TasksService(eventRepo, profileRepo, transferUseCase);
  });
});
