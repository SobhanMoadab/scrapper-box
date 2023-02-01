import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { Either, left, Result, right } from '../../core/Result';
import { ResultMapper } from '../../mappers/ResultMapper';
import { SearchProductDTO, DigikalaProductVM } from './SearchProductDTO';
import { AgentNotFound } from './SearchProductErrors';

// search to get result, select one to choose comments
type Response = Either<AgentNotFound | Result<DigikalaProductVM>, Result<any>>;

@Injectable()
export class SearchProductUseCase {
  public agents = {
    digikala: {
      search: 'https://api.digikala.com/v1/search/?q=',
      comments: 'https://api.digikala.com/v1/product/',
    },
  };

  // async searchTitleFromDigikala(searchTitle: string) {
  //   try {
  //     const result = await axios.get(``);
  //     const products = this.digikalaMapper(result);

  //     return products;
  //     // return result.data.data.products.filter(
  //     //   (item: any, index: any) => index < 5,
  //     // );
  //   } catch (err) {
  //     throw new Error('Could not get result from digikala API');
  //   }
  // }
  // async fetchCommentsFromAgent({ productId }: FetchCommentDTO) {
  //   const result = await axios.get(url);
  //   return result.data.data.comments;
  // }
  async fetchProductFromAgent({
    searchAgent,
    searchTitle,
  }: SearchProductDTO): Promise<Response> {
    try {
      // find agent
      const agent = this.agents[searchAgent as keyof typeof this.agents];
      if (!agent) {
        return left(new AgentNotFound());
      }
      // fetch from agent
      const axiosResult = await axios.get(agent.search + searchTitle);
      // map result
      const result = ResultMapper.toDigikalaVM(axiosResult);
      console.log(
        '🚀 ~ file: SearchProduct.ts:51 ~ SearchProductUseCase ~ result',
        result,
      );
      return right(Result.ok<DigikalaProductVM>(result));
    } catch (err) {
      throw new Error(err);
    }
  }

  // const content = {
  //   post: 3860,
  //   author_name: 'sobhan12',
  //   author_email: 'sobhan12@test.com',
  //   content: comments[0].body,
  // };
  // const wordPressApi = 'https://urumdental.com/wp-json/wp/v2/comments';
  // const result3 = await axios.post(wordPressApi, JSON.stringify(content), {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization:
  //       'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3VydW1kZW50YWwuY29tIiwiaWF0IjoxNjc0NjM3MTQzLCJuYmYiOjE2NzQ2MzcxNDMsImV4cCI6MTY3NTI0MTk0MywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMTExIn19fQ.7jfe_i9Fr5WbFpN4IVpw6qhLplRSiwMAtCyhBKI_sGY',
  //   },
  // });
}