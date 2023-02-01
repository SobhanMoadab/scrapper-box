import { DigikalaProductVM } from '../usecases/searchProduct/SearchProductDTO';

export class ResultMapper {
  static pick(obj: any, ...props: any) {
    return props.reduce(function (result: any, prop: any) {
      result[prop] = obj[prop];
      return result;
    }, {});
  }

  public static toDigikalaVM(result: any): DigikalaProductVM {
    return result.data.data.products
      .map((p: any) => this.pick(p, 'id', 'title_fa', 'title_en'))
      .filter((item: any, index: any) => index < 5);
  }
}
