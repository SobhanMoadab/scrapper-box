import { Comment } from '../domain/Comment';

export interface ICommentRepository {
  save(comment: Comment): Promise<void>;
  saveBulk(comments: Comment[]): Promise<void>;
  findTodayComments(eventId: string): Promise<Comment[]>;
  markSentComment(comment: unknown): Promise<void>;
}
