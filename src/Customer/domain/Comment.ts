import { ObjectId } from 'mongoose';
import { Entity } from '../../core/Entity';
import { Result } from '../../core/Result';
import {
  WordPressPostComment,
  WordPressProductComment,
} from '../../usecases/transferComments/TransferCommentDTO';

export type CommentProps = {
  comment: WordPressPostComment | WordPressProductComment;
  publishDate: string;
  profileId: string | ObjectId;
};

export class Comment extends Entity<CommentProps> {
  constructor(props: CommentProps, id?: string) {
    super(props, id);
  }

  static create(props: CommentProps, id?: string): Result<Comment> {
    console.log('🚀🚀🚀🚀', props);
    if (!props.comment || !props.publishDate || !props.profileId) {
      return Result.fail('invalid comment props');
    }
    const comment = new Comment(props, id);
    return Result.ok(comment);
  }
}
