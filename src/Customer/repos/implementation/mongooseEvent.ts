import { LeanDocument, Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { EventProps } from '../../domain/Event';
import { IEventRepository } from '../IEventRepository.ts';
import { Event } from '../../domain/Event';
import { UniqueEntityID } from '../../../core/UniqueEntityID';
import { SaveCommentsDTO } from '../../usecases/saveComments/SaveCommentsDTO';
import {
  WordPressPostComment,
  WordPressProductComment,
} from '../../../usecases/transferComments/TransferCommentDTO';
import { ICommentRepository } from '../ICommentRepository';
import { CommentRepository } from './mongooseComment';

@Injectable()
export class EventRepository implements IEventRepository {
  constructor(
    @InjectModel('Event')
    private eventModel: Model<EventProps>,
    @Inject(CommentRepository) public customerRepo: ICommentRepository,
  ) {}

  async exists(eventId: any): Promise<boolean> {
    const founded = await this.eventModel.exists({ _id: eventId });
    if (!founded) return false;
    else return true;
  }

  async removeCommentFromEvent(
    eventId: string,
    comment: WordPressPostComment | WordPressProductComment,
  ): Promise<void> {
    const isExists = await this.exists(eventId);
    if (!isExists) {
      await this.eventModel.findByIdAndDelete(eventId);
    } else {
      await this.eventModel.findByIdAndUpdate(eventId, {
        $pull: {
          comments: comment,
        },
      });
    }
  }

  async save(event: Event): Promise<void> {
    await this.eventModel.create({
      profileId: event.props.profileId,
      date: event.props.date,
    });
  }
  async findUnfinishedEvent(profileId: string): Promise<Event> {
    const founded = await this.eventModel
      .findOne({
        status: false,
        profileId,
        comments: { $exists: true, $not: { $size: 0 } },
      })
      .lean();
    if (!founded) throw new Error();
    const result = Event.create(
      {
        date: founded.date,
        profileId: founded.profileId,
        status: founded.status,
      },
      founded._id.toString(),
    ).getValue();
    return result;
  }

  //   comments: event.
  //   date,
  //   profileId,
  // }).getValue();
  // return events.map((e: any) => {
  // const result = Event.create({
  //   comments: event.
  //   date,
  //   profileId,
  // }).getValue();
  // return result;
  // });
}
