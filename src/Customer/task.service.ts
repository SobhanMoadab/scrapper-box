import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common/decorators';
import { Cron, CronExpression } from '@nestjs/schedule';
import { TransferCommentUseCase } from '../usecases/transferComments/TransferComment';
import { TransferCommentDTO } from '../usecases/transferComments/TransferCommentDTO';
import { ICommentRepository } from './repos/ICommentRepository';
import { IEventRepository } from './repos/IEventRepository.ts';
import { CommentRepository } from './repos/implementation/mongooseComment';
import { EventRepository } from './repos/implementation/mongooseEvent';
import { ProfileRepository } from './repos/implementation/mongooseProfile';
import { IProfileRepository } from './repos/IProfileRepository';

@Injectable()
export class TasksService {
  constructor(
    @Inject(EventRepository) public eventRepo: IEventRepository,
    @Inject(ProfileRepository) public profileRepo: IProfileRepository,
    @Inject(CommentRepository) public commentRepo: ICommentRepository,
    public readonly transferComment: TransferCommentUseCase,
  ) {}

  @Cron(CronExpression.EVERY_10_HOURS, {
    timeZone: 'Asia/Tehran',
  })
  async handleCron() {
    try {
      const profile = await this.profileRepo.findByCustomerId(
        '63f23039f1765d0e1a48bb43',
      );
      const foundedComments = await this.commentRepo.findTodayComments(
        '63f3a0f9b82d49c5b2ef5c28',
      );

      for (let index = 0; index <= profile.props.commentLimit; index++) {
        if (index > foundedComments.length) continue;

        // const { comments } = unfinishedEvent.props;

        const dto: TransferCommentDTO = {
          comment: foundedComments[index].props.comment,
          contentType: profile.props.commentType,
          siteUrl: profile.props.siteUrl,
          token: profile.props.token,
        };

        // await this.transferComment.transferComment(dto);
        // await this.eventRepo.removeCommentFromEvent(
        //   unfinishedEvent.eventId.toString(),
        //   comments[index],
        // );
      }
    } catch (err) {
      console.log({ err });
    }
  }
}
