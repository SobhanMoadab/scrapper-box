import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { SearchProductUseCase } from '../usecases/searchProduct/SearchProduct';
import {
  DigikalaProductVM,
  SearchProductDTO,
} from '../usecases/searchProduct/SearchProductDTO';
import { AgentNotFound } from '../usecases/searchProduct/SearchProductErrors';

describe('SearchProductUseCase', () => {
  let useCase: SearchProductUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchProductUseCase, SearchProductUseCase],
      imports: [AppModule],
    }).compile();

    useCase = module.get<SearchProductUseCase>(SearchProductUseCase);
  });

  it('useCase should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw when called with incomplete input', async () => {
    // Given i provide invalid search details

    const dto: SearchProductDTO = {
      searchAgent: 'nothing',
      searchTitle: 'iphone 13',
    };

    // When i attempt to search for a product
    const result = await useCase.fetchProductFromAgent(dto);
    expect(result.isRight()).toBeFalsy();
    // Then product results should instance of AgentNotFound error class
    expect(result.value).toBeInstanceOf(AgentNotFound);
  });

  it('should respond successfully when called with proper input', async () => {
    // Given i provide valid search details
    const dto: SearchProductDTO = {
      searchAgent: 'digikala',
      searchTitle: 'iphone 13 pro',
    };

    // When i attempt to search for a product,
    const result = await useCase.fetchProductFromAgent(dto);
    const products = result.value.getValue();

    // Then product results should be returned successfully
    expect(result.isRight()).toBeTruthy();
    products.forEach((element: any) => {
      expect(element).toHaveProperty('id');
      expect(element).toHaveProperty('title_en');
      expect(element).toHaveProperty('title_fa');
    });
  });
});
