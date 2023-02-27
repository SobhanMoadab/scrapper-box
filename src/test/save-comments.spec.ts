import { ICommentRepository } from '../Customer/repos/ICommentRepository';
import { IProfileRepository } from '../Customer/repos/IProfileRepository';
import { InvalidInput } from '../Customer/usecases/profile/SaveProfileErrors';
import { SaveCommentUseCase } from '../Customer/usecases/saveComments/SaveComments';
import { SaveCommentsDTO } from '../Customer/usecases/saveComments/SaveCommentsDTO';
import { Profile } from '../Customer/domain/Profile';
import { Comment } from '../Customer/domain/Comment';

describe('Save comments use case', () => {
  let useCase: SaveCommentUseCase;
  let commentRepo: ICommentRepository;
  let profileRepo: IProfileRepository;
  let dto: SaveCommentsDTO;
  const profile = Profile.create({
    commentLimit: 3,
    commentType: 'POST',
    customerId: 'test',
    publishTime: 'WEEKLY',
    sitePassword: 'test',
    siteUrl: 'test',
    siteUsername: 'test',
    token: 'test',
  }).getValue();
  beforeEach(() => {
    dto = {
      comments: [
        {
          product_id: 1,
          review: 'string',
          reviewer: 'string',
          reviewer_email: 'string',
          rating: 1,
        },
        {
          post: '1',
          author_email: 'test',
          author_name: 'test',
          content: 'test',
        },
      ],
      publishType: 'WEEKLY',
    };
    profileRepo = {
      findByCustomerId: jest.fn(() => Promise.resolve(profile)),
      save: jest.fn(),
    };
    commentRepo = {
      save: jest.fn(),
      findTodayComments: jest.fn(),
      saveBulk: jest.fn(),
    };
    useCase = new SaveCommentUseCase(commentRepo, profileRepo);
  });

  it('should save events to database', async () => {
    profileRepo.findByCustomerId = jest.fn(() => Promise.resolve(profile));
    const validDTO: SaveCommentsDTO = {
      comments: dto.comments,
      publishType: 'WEEKLY',
    };
    const result = await useCase.saveComments(validDTO);
    expect(result.isLeft()).toBeFalsy();
    expect(commentRepo.saveBulk).toBeCalled();
  });
});
