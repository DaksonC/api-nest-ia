/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SearchController } from './azure-search/azure-search.controller';
import { AzureSearchService } from './azure-search/azure-search.service';

@Module({
  imports: [],
  controllers: [AppController, SearchController],
  providers: [AppService, AzureSearchService],
})
export class AppModule { }
