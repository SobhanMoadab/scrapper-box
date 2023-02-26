import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment, CommentProps } from '../../domain/Comment';
import { ICommentRepository } from '../ICommentRepository';

@Injectable()
export class CommentRepository implements ICommentRepository {
  constructor(
    @InjectModel('Comment')
    private commentModel: Model<CommentProps>,
  ) {}

  //   async exists(username: string): Promise<boolean> {
  //     const founded = await this.commentModel.findOne({ username }).lean();
  //     if (founded) return true;
  //     else return false;
  //   }
  //   async findByUsername(username: string): Promise<Customer> {
  //     const founded = await this.commentModel.findOne({ username });
  //     if (!founded) throw new Error();
  //     return Customer.create(founded).getValue();
  //   }
  private commentMapper(comments: any[]): Comment[] {
    return comments.map((c) => {
      return Comment.create(
        {
          comment: c.comment,
          profileId: c.profileId,
          publishDate: c.publishDate,
        },
        c._id,
      ).getValue();
    });
  }
  async findTodayComments(eventId: string): Promise<Comment[]> {
    const founded = await this.commentModel.find({
      eventId,
      createdAt: { $gte: new Date(Date.now() - 1000 * 60 * 60 * 24) },
    });
    if (!founded) throw new Error();
    return this.commentMapper(founded);
  }
  async saveBulk(comments: Comment[]): Promise<void> {
    for (const comment of comments) {
      await this.save(comment);
    }
  }
  async save(comment: Comment): Promise<void> {
    await this.commentModel.create({
      comment: comment.props.comment,
      profileId: comment.props.profileId,
      publishDate: comment.props.publishDate,
    });
  }
}
