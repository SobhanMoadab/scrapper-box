import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import {
  isReview,
  TransferCommentDTO,
} from '../usecases/transferComments/TransferCommentDTO';
import { ICommentRepository } from './repos/ICommentRepository';
import { IEventRepository } from './repos/IEventRepository.ts';
import { CommentRepository } from './repos/implementation/mongooseComment';
import { EventRepository } from './repos/implementation/mongooseEvent';
import { ProfileRepository } from './repos/implementation/mongooseProfile';
import { IProfileRepository } from './repos/IProfileRepository';
import * as moment from 'moment-timezone';

@Injectable()
export class TasksService {
  constructor(
    @Inject(EventRepository) public eventRepo: IEventRepository,
    @Inject(ProfileRepository) public profileRepo: IProfileRepository,
    @Inject(CommentRepository) public commentRepo: ICommentRepository,
    public readonly transferComment: TransferCommentUseCase,
  ) {}

  @Cron(CronExpression.EVERY_5_SECONDS, {
    timeZone: 'Asia/Tehran',
  })
  async handleCron() {
    const currentTime = moment().toDate();
    try {
      const profile = await this.profileRepo.findByCustomerId(
        '63f23039f1765d0e1a48bb43',
      );
      const foundedComments = await this.commentRepo.findTodayComments(
        '63f25062f5885a3cbc18fd36',
      );
      for (let i = 0; i <= profile.props.commentLimit; i++) {
        console.log({
          111: currentTime < foundedComments[i].props.publishDate,
        });
        if (
          currentTime < foundedComments[i].props.publishDate ||
          !foundedComments
        )
          continue;
        const dto: TransferCommentDTO = {
          comment: foundedComments[i].props.comment,
          contentType: profile.props.commentType,
          siteUrl: profile.props.siteUrl,
          token: profile.props.token,
        };

        const result = await this.transferComment.transferComment(dto);
        await this.commentRepo.markSentComment(dto.comment);
        // await this.eventRepo.removeCommentFromEvent(
        //   unfinishedEvent.eventId.toString(),
        //   comments[i],
        // );
      }
    } catch (err) {
      console.log({ err });
    }
  }
}
