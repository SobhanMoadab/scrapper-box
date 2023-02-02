import { DigikalaCommentVM } from '../usecases/fetchComments/FetchCommentDTO';
import { DigikalaProductVM } from '../usecases/searchProduct/SearchProductDTO';

export class ResultMapper {
  static pick(obj: any, ...props: any) {
    return props.reduce(function (result: any, prop: any) {
      result[prop] = obj[prop];
      return result;
    }, {});
  }

  public static toDigikalaProductVM(result: any): DigikalaProductVM[] {
    return result?.data?.data?.products
      .map((p: any) => this.pick(p, 'id', 'title_fa', 'title_en'))
      .filter((item: any, index: any) => index < 5);
  }
  public static toDigikalaCommentVM(result: any): DigikalaCommentVM[] {
    return result?.data?.data?.comments
      .map((p: any) =>
        this.pick(
          p,
          'id',
          'title',
          'body',
          'rate',
          'user_name',
          'recommendation_status',
        ),
      )
      .filter((item: any, index: any) => index < 5);
  }
}
