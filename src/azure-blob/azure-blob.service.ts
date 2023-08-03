import { Injectable } from '@nestjs/common';
import { BlobServiceClient, ContainerClient } from '@azure/storage-blob';
import * as dotenv from 'dotenv';

@Injectable()
export class AzureBlobService {
  private blobServiceClient: BlobServiceClient;
  private containerClient: ContainerClient;

  constructor() {
    dotenv.config();

    const connectionString = process.env.AZURE_BLOB_CONNECTION_STRING;
    this.blobServiceClient =
      BlobServiceClient.fromConnectionString(connectionString);

    const containerName = process.env.AZURE_BLOB_CONTAINER_NAME;
    this.containerClient =
      this.blobServiceClient.getContainerClient(containerName);
  }

  async downloadBlob(blobName: string): Promise<string> {
    const blobClient = this.containerClient.getBlobClient(blobName);
    const downloadResponse = await blobClient.download(0); // Ajuste o segundo parâmetro se desejar baixar somente uma parte do blob
    const downloadedContent = await this.blobToString(
      await downloadResponse.blobBody,
    );
    return downloadedContent;
  }

  private async blobToString(blob: any): Promise<string> {
    return await new Promise<string>((resolve, reject) => {
      const chunks: any[] = [];
      blob.on('data', (data: any) => {
        chunks.push(data);
      });
      blob.on('end', () => {
        resolve(Buffer.concat(chunks).toString());
      });
      blob.on('error', reject);
    });
  }
}
