export interface IFileDocument {
  id: string; // Um identificador único para o documento
  name: string; // Nome do arquivo
  content: string; // Conteúdo do arquivo (convertido para string)
  contentType: string; // Tipo de conteúdo (por exemplo, 'text/csv', 'application/pdf', 'image/png', etc.)
}
