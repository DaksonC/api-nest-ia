import { Test, TestingModule } from '@nestjs/testing';
import { SearchController } from './azure-search/azure-search.controller';
import { AzureSearchService } from './azure-search/azure-search.service';

describe('SearchController', () => {
  let searchController: SearchController;
  let azureSearchService: AzureSearchService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [SearchController],
      providers: [
        {
          provide: AzureSearchService,
          useValue: {
            search: jest.fn(),
          },
        },
      ],
    }).compile();

    searchController = app.get<SearchController>(SearchController);
    azureSearchService = app.get<AzureSearchService>(AzureSearchService);
  });

  describe('search', () => {
    it('should return search results', async () => {
      const query = 'Dakson';
      const mockSearchResults = [
        { id: '1', name: 'Dakson File', content: 'Content of Dakson File' },
      ];

      azureSearchService.search = jest
        .fn()
        .mockResolvedValue(mockSearchResults);

      const searchResults = await searchController.search(query);

      expect(searchResults).toEqual(mockSearchResults);
    });

    it('should handle search error', async () => {
      const query = 'Dakson';
      const mockError = new Error('Search error');

      azureSearchService.search = jest.fn().mockRejectedValue(mockError);

      await expect(searchController.search(query)).rejects.toThrowError(
        mockError,
      );
    });
  });
});
