/* eslint-disable prettier/prettier */
import { Controller, Post, Body } from '@nestjs/common';
import { AzureSearchService } from 'src/azure-search/azure-search.service';

@Controller('api')
export class BlobController {
  constructor(private readonly azureSearchService: AzureSearchService) { }

  @Post('upload')
  async upload(@Body('blobName') blobName: string): Promise<void> {
    await this.azureSearchService.uploadAndIndexBlob(blobName);
  }
}
