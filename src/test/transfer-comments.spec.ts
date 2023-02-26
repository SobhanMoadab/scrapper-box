import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { ProfileDTO } from '../Customer/usecases/profile/SaveProfileDTO';
import { ProfileUseCase } from '../Customer/usecases/profile/SaveProfileUseCase';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import { TransferCommentDTO } from '../usecases/transferComments/TransferCommentDTO';
import { InvalidTransferCommentDTO } from '../usecases/transferComments/TransferCommentErrors';
import { CONSTANTS } from '../utils/constants';

describe('Transfer comments useCase', () => {
  let useCase: TransferCommentUseCase;
  let saveProfileUseCase: ProfileUseCase;
  let randomString: string;
  let token: string;

  const loginDto: ProfileDTO = {
    username: process.env.URUM_USERNAME!,
    password: process.env.URUM_PASSWORD!,
    siteUrl: 'https://urumdental.com',
  };
  beforeEach(async () => {
    randomString = (Math.random() + 1).toString(36).substring(7);
    const module: TestingModule = await Test.createTestingModule({
      providers: [],
      imports: [AppModule],
    }).compile();

    useCase = module.get<TransferCommentUseCase>(TransferCommentUseCase);
    saveProfileUseCase = module.get<ProfileUseCase>(ProfileUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  // given i provide invalid input, i should get error
  it('should throw bad request exception, when provided with invalid data', async () => {
    const dto: TransferCommentDTO = {
      token: '',
      contentType: 'PRODUCT',
      siteUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: `${randomString}@gmail.com`,
        author_name: 'sobhan',
        content: 'test',
        post: '3860',
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);
    // then i expect result to be instance of bad excetion class
    expect(result.isRight()).toBeFalsy();
    expect(result.value).toBeInstanceOf(InvalidTransferCommentDTO);
  });

  it('should respond correctly, when provided with valid product data', async () => {
    const loginResult = await saveProfileUseCase.saveProfile(loginDto);
    token = loginResult.value.getValue();

    const dto: TransferCommentDTO = {
      contentType: 'PRODUCT',
      token: token,
      siteUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        product_id: 5848,
        review: 'testing review',
        reviewer: `${randomString}`,
        reviewer_email: `${randomString}@gmail.com`,
        rating: 5,
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);

    // then i expect result to be correct
    expect(result.isLeft()).toBeFalsy();
  }, 12_000);

  it('should respond correctly, when provided with valid post data', async () => {
    const loginResult = await saveProfileUseCase.saveProfile(loginDto);
    token = loginResult.value.getValue();

    const dto: TransferCommentDTO = {
      contentType: 'POST',
      token: token,
      siteUrl: CONSTANTS.URUM_DENTAL_URL,
      comment: {
        author_email: `${randomString}@gmail.com`,
        author_name: 'sobhan',
        content: 'test',
        post: '3860',
      },
    };
    // when i attempt to transfer comments
    const result = await useCase.transferComment(dto);

    // then i expect result to be correct
    expect(result.isLeft()).toBeFalsy();
  }, 12_000);
});
