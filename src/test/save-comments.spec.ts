import { ICommentRepository } from '../Customer/repos/ICommentRepository';
import { IProfileRepository } from '../Customer/repos/IProfileRepository';
import { InvalidInput } from '../Customer/usecases/profile/SaveProfileErrors';
import { SaveCommentUseCase } from '../Customer/usecases/saveComments/SaveComments';
import { SaveCommentsDTO } from '../Customer/usecases/saveComments/SaveCommentsDTO';
import { CalledWithMock, mock } from 'jest-mock-extended';
import { Profile } from '../Customer/domain/Profile';

describe('Save comments use case', () => {
  let useCase: SaveCommentUseCase;
  let commentRepo: ICommentRepository;
  let profileRepo: IProfileRepository;
  let dto: SaveCommentsDTO;
  let profile: Profile;

  beforeEach(() => {
    profile = Profile.create({
      commentLimit: 3,
      commentType: 'POST',
      customerId: 'test',
      publishTime: 'WEEKLY',
      sitePassword: 'test',
      siteUrl: 'test',
      siteUsername: 'test',
      token: 'test',
    }).getValue();
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
      publishTime: 'WEEKLY',
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
    const validDTO: SaveCommentsDTO = {
      comments: dto.comments,
      publishTime: 'WEEKLY',
    };
    const result = await useCase.saveComments(validDTO);
    console.log('🚀', result.value);
    expect(result.isLeft()).toBeFalsy();
    expect(commentRepo.save).toBeCalled();
  });

  it('should respond with error when dto is invalid', async () => {
    const invalidDTO: SaveCommentsDTO = {
      comments: dto.comments,
      publishTime: 'WEEKLY',
    };
    const result = await useCase.saveComments(invalidDTO);
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidInput);
  });
});
