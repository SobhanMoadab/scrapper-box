import { Either, left, Result, right } from '../../../core/Result';
import { UnexpectedError } from '../../../core/UnexpectedError';
import { Profile404 } from '../profile/SaveProfileErrors';
import { SaveCommentsDTO } from './SaveCommentsDTO';
import { Inject } from '@nestjs/common';
import { ProfileRepository } from '../../repos/implementation/mongooseProfile';
import { IProfileRepository } from '../../repos/IProfileRepository';
import { Profile } from '../../domain/Profile';
import { getPublishDates } from '../../../shared/utils/getPublishDates';
import { ICommentRepository } from '../../repos/ICommentRepository';
import { CommentRepository } from '../../repos/implementation/mongooseComment';
import { Comment } from '../../domain/Comment';
import { isReview } from '../../../usecases/transferComments/TransferCommentDTO';

type Response = Either<UnexpectedError | Result<any>, Result<void>>;

export class SaveCommentUseCase {
  constructor(
    @Inject(CommentRepository) public commentRepo: ICommentRepository,
    @Inject(ProfileRepository) public profileRepo: IProfileRepository,
  ) {}

  async saveComments(dto: SaveCommentsDTO): Promise<Response> {
    let profile: Profile;
    try {
      try {
        profile = await this.profileRepo.findByCustomerId(
          '63f23039f1765d0e1a48bb43',
        );
      } catch (err) {
        return left(new Profile404());
      }
      const publishTime = getPublishDates(
        dto.comments.length,
        profile.props.publishTime,
        profile.props.commentLimit,
      );
      const commentResults: Array<Result<Comment>> = [];

      for (const [index, comment] of dto.comments.entries()) {
        if (isReview(comment)) {
          const commentOrError = Comment.create({
            comment: {
              product_id: comment.product_id,
              rating: comment.rating,
              review: comment.review,
              reviewer: comment.reviewer,
              reviewer_email: comment.reviewer_email,
            },
            publishDate: publishTime[index],
            profileId: profile.profileId.toString(),
          });
          commentResults.push(commentOrError);
        } else {
          const commentOrError = Comment.create({
            comment: {
              post: comment.post,
              author_email: comment.author_email,
              author_name: comment.author_name,
              content: comment.content,
            },
            publishDate: publishTime[index],
            profileId: profile.profileId.toString(),
          });
          commentResults.push(commentOrError);
        }
      }
      const dtoResult = Result.combine(commentResults);
      if (dtoResult.isFailure) {
        return left(Result.fail<void>(dtoResult.getErrorValue())) as Response;
      }
      const comments = Result.resultsToValues(commentResults);
      await this.commentRepo.saveBulk(comments);
      return right(Result.ok());
    } catch (err) {
      return left(new UnexpectedError('Something went wrong'));
    }
  }
}
