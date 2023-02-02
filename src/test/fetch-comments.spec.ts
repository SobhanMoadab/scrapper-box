import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { FetchCommentDTO } from '../usecases/fetchComments/FetchCommentDTO';
import { FetchCommentsUseCase } from '../usecases/fetchComments/FetchComment';
import { ProductNotFound } from '../usecases/fetchComments/FetchCommentErrors';

describe('Fetch comments usecase', () => {
  let useCase: FetchCommentsUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FetchCommentsUseCase],
      imports: [AppModule],
    }).compile();

    useCase = module.get<FetchCommentsUseCase>(FetchCommentsUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw error with wrong input', async () => {
    // Given i provide wrong input
    const invalidDTO: FetchCommentDTO = {
      searchAgent: 'digikala',
      productId: 'aa',
    };
    // When i attempt to fetch comments from targeted site
    const result = await useCase.fetchCommentsFromTarget(invalidDTO);
    const error = result.value;
    // Then i expect to get error as returned value
    expect(error).toBeInstanceOf(ProductNotFound);
    expect(result.isRight()).toBeFalsy();
  });
});
