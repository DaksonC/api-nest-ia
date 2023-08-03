import { Injectable } from '@nestjs/common';
import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import { IFileDocument } from 'src/models/file-document.model';

@Injectable()
export class AzureSearchService {
  private searchClient: SearchClient<IFileDocument>;

  constructor() {
    const searchServiceName = process.env.AZURE_SEARCH_SERVICE_NAME;
    const searchAdminKey = process.env.AZURE_SEARCH_ADMIN_KEY;
    const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

    const endpoint = `https://${searchServiceName}.search.windows.net`;
    const credential = new AzureKeyCredential(searchAdminKey);
    this.searchClient = new SearchClient(endpoint, indexName, credential);
  }

  async search(query: string): Promise<any> {
    const searchResults = await this.searchClient.search(query);
    return searchResults?.results;
  }
}
