/* eslint-disable prettier/prettier */
import { Controller, Get, Param } from '@nestjs/common';
import { AzureSearchService } from './azure-search.service';

@Controller('api')
export class SearchController {
  constructor(private readonly azureSearchService: AzureSearchService) { }

  @Get('search/:query')
  async search(@Param('query') query: string): Promise<any> {
    const searchResults = await this.azureSearchService.search(query);
    return searchResults;
  }
}
