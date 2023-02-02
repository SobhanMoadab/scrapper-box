import axios from 'axios';
import { Either, left, Result, right } from '../../core/Result';
import { UnexpectedError } from '../../core/UnexpectedError';
import { AgentNotFound } from '../searchProduct/SearchProductErrors';
import { DigikalaCommentVM, FetchCommentDTO } from './FetchCommentDTO';
import { ProductNotFound } from './FetchCommentErrors';

type Response = Either<
  AgentNotFound | ProductNotFound | Result<DigikalaCommentVM>,
  Result<any>
>;

export class FetchCommentsUseCase {
  public agents = {
    digikala: {
      search: 'https://api.digikala.com/v1/search/?q=',
      comments: 'https://api.digikala.com/v1/product/',
    },
  };

  constructor() {}

  async fetchCommentsFromTarget({
    productId,
    searchAgent,
  }: FetchCommentDTO): Promise<Response> {
    try {
      const agent = this.agents[searchAgent as keyof typeof this.agents];
      if (!agent) {
        return left(new AgentNotFound());
      }
      const axiosResult = await axios.get(
        `https://api.digikala.com/v1/product/${productId}/comments/?page=1`,
      );
      console.log({ axiosResult: axiosResult.data?.data?.comments });
      if (axiosResult.data?.status !== 200) {
        return left(new ProductNotFound());
      }
      return right(Result.ok());
      // const result = ResultMapper.toDigikalaCommentVM(axiosResult);
    } catch (err) {
      console.log({ err });
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
