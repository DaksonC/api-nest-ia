import { Injectable } from '@nestjs/common';
import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
import { IFileDocument } from 'src/models/file-document.model';
import { AzureBlobService } from 'src/azure-blob/azure-blob.service';
import * as dotenv from 'dotenv';

@Injectable()
export class AzureSearchService {
  private searchClient: SearchClient<IFileDocument>;

  constructor(private readonly azureBlobService: AzureBlobService) {
    dotenv.config();

    const searchServiceName = process.env.AZURE_SEARCH_SERVICE_NAME;
    const searchAdminKey = process.env.AZURE_SEARCH_ADMIN_KEY;
    const indexName = process.env.AZURE_SEARCH_INDEX_NAME;

    const endpoint = `https://${searchServiceName}.search.windows.net`;
    const credential = new AzureKeyCredential(searchAdminKey);
    this.searchClient = new SearchClient(endpoint, indexName, credential);
  }

  async uploadAndIndexBlob(blobName: string): Promise<void> {
    const blobContent = await this.azureBlobService.downloadBlob(blobName);
    const contentType = 'application/json'; // Ajuste o tipo de conteúdo conforme o arquivo

    const document: IFileDocument = {
      id: blobName,
      name: blobName,
      content: blobContent,
      contentType: contentType,
    };

    await this.searchClient.uploadDocuments([document]);
  }

  async search(query: string): Promise<IFileDocument[]> {
    const searchResults = await this.searchClient.search(query);
    const documents: IFileDocument[] = [];
    for await (const result of searchResults.results) {
      documents.push(result.document);
    }
    return documents;
  }
}
