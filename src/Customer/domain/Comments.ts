import { WatchedList } from '../../core/WatchedlList';
import { Comment } from './Comment';

export class Comments extends WatchedList<Comment> {
  private constructor(initialCategories: Comment[]) {
    super(initialCategories);
  }

  public compareItems(a: Comment, b: Comment): boolean {
    return a.equals(b);
  }

  public static create(categories?: Comment[]): Comments {
    return new Comments(categories ? categories : []);
  }
}
