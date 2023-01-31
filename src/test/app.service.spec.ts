import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { AppService } from '../app.service';
import { SearchDTO } from '../search.dto';

describe('ApiService', () => {
  let service: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
      imports: [AppModule],
    }).compile();

    service = module.get<AppService>(AppService);
  });

  it('ApiService - should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should respond successfully when called with proper input', async () => {
    // Given i provide valid search details
    const dto: SearchDTO = {
      searchAgent: 'digikala',
      searchTitle: 'iphone 13 pro',
    };
    // When i attempt to search for a product,
    const result = await service.searchTarget(dto);
    // Then product results should be returned successfully
    expect(result).toEqual(
      expect.objectContaining([
        {
          id: expect.any(Number),
          title_fa: expect.any(String),
          title_en: expect.any(String),
        },
      ]),
    );
  });
});
