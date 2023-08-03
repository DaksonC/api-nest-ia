/* eslint-disable prettier/prettier */
// import { Injectable } from '@nestjs/common';
// import { SearchClient, AzureKeyCredential } from '@azure/search-documents';
// import { AzureBlobService } from 'src/azure-blob/azure-blob.service';

// @Injectable()
// export class OpenAIService {
//   constructor(private readonly azureBlobService: AzureBlobService) { }

//   async getAnswerFromOpenAI(question: string): Promise<string> {
//     const documents = await this.getDocumentsFromBlob(); // Obter os documentos relevantes do blob
//     const context = documents.join(' '); // Criar um contexto combinando o conteúdo dos documentos

//     // Chamar o serviço do Azure OpenAI para obter a resposta
//     // Substitua o código abaixo com a chamada correta para a API do Azure OpenAI
//     const response = await someOpenAIAPI(question, context);

//     // Extrair e retornar a resposta do objeto de resposta do Azure OpenAI
//     // Substitua 'answer' pelo campo correto que contém a resposta na resposta do Azure OpenAI
//     return response.answer;
//   }

//   private async getDocumentsFromBlob(): Promise<string[]> {
//     // Lógica para obter os documentos do blob usando o AzureBlobService
//     // Implemente a lógica aqui para baixar os documentos relevantes do blob e retorná-los em um array de strings
//     // Por exemplo, você pode chamar o método 'downloadBlob' do serviço AzureBlobService para obter o conteúdo dos documentos
//     const document1Content = await this.azureBlobService.downloadBlob(
//       'document1.pdf',
//     );
//     const document2Content = await this.azureBlobService.downloadBlob(
//       'document2.docx',
//     );

//     return [document1Content, document2Content];
//   }
// }
