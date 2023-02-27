import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Comment, CommentProps } from '../../domain/Comment';
import { ICommentRepository } from '../ICommentRepository';
import * as moment from 'moment-timezone';

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
          status: c.status,
        },
        c._id,
      ).getValue();
    });
  }
  async findTodayComments(profileId: string): Promise<Comment[]> {
    const start = moment().startOf('day').toDate();
    const end = moment().endOf('day').toDate();
    const founded = await this.commentModel.find({
      status: false,
      profileId,
      publishDate: {
        $gte: start,
        $lte: end,
      },
    });
    if (!founded) throw new Error();
    return this.commentMapper(founded);
  }
  async saveBulk(comments: Comment[]): Promise<void> {
    for (const comment of comments) {
      await this.save(comment);
    }
  }
  async markSentComment(comment: unknown): Promise<void> {
    await this.commentModel.findOneAndUpdate(
      {
        comment,
      },
      {
        status: true,
      },
    );
  }
  async save(comment: Comment): Promise<void> {
    await this.commentModel.create({
      comment: comment.props.comment,
      profileId: comment.props.profileId,
      publishDate: comment.props.publishDate,
    });
  }
}
