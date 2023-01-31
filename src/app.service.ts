import { Injectable } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { FetchCommentDTO } from './fetch-comment.dto';
import { SearchDTO } from './search.dto';

// search to get result, select one to choose comments

@Injectable()
export class AppService {
  // constructor() {}
  pick(obj: any, ...props: any) {
    return props.reduce(function (result: any, prop: any) {
      result[prop] = obj[prop];
      return result;
    }, {});
  }
  digikalaMapper(searchResult: any) {
    return searchResult.data.data.products
      .map((p: any) => this.pick(p, 'id', 'title_fa', 'title_en'))
      .filter((item: any, index: any) => index < 5);
  }

  async searchTitleFromDigikala(searchTitle: string) {
    try {
      const result = await axios.get(
        `https://api.digikala.com/v1/search/?q=${searchTitle}`,
      );
      const products = this.digikalaMapper(result);

      return products;
      // return result.data.data.products.filter(
      //   (item: any, index: any) => index < 5,
      // );
    } catch (err) {
      throw new Error('Could not get result from digikala API');
    }
  }
  async fetchCommentsFromAgent({ productId }: FetchCommentDTO) {
    const url = `https://api.digikala.com/v1/product/${productId}/comments/?page=1`;
    const result = await axios.get(url);
    return result.data.data.comments;
  }
  public async searchTarget({
    searchAgent,
    searchTitle,
  }: SearchDTO): Promise<any> {
    let queryResult: any;
    try {
      if (searchAgent === 'digikala') {
        queryResult = await this.searchTitleFromDigikala(searchTitle);
      }
      return queryResult;
      // const ids = items.map((p: any) => p.id);
      // const urlComment = `https://api.digikala.com/v1/product/${ids[0]}/comments/?page=1`;
      // const result2 = await axios.get(urlComment);
      // const comments = result2.data.data.comments;
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
      // console.log({ result3: result3.data });
      // return comments;
    } catch (err) {
      throw new Error(err);
    }
  }
}
