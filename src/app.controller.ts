import { Body, Controller, Get, Inject, Post, Query } from '@nestjs/common';
import { SearchDTO } from './search.dto';
import { AppService } from './app.service';
import { FetchCommentDTO } from './fetch-comment.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }


  // user search for a product with dto like
  // {
  //   target: 'digikala'
  //   query: 'iphone13'
  // } and i return bunch of result

  @Get('search')
  async search(@Query() query: SearchDTO): Promise<any> {
    // const agent = await this.appService.findAgent(query.searchTarget)
    // if (!agent) throw new Error()
    const queryResult = await this.appService.searchTarget({
      searchAgent: query.searchAgent,
      searchTitle: query.searchTitle,
    });
    return queryResult;
  }
  @Get('comments')
  async fetchComments(@Query() query: FetchCommentDTO): Promise<any> {
    const result = await this.appService.fetchCommentsFromAgent(query);
    return result;
  }
}
