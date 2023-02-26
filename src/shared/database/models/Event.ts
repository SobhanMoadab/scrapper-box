import { Schema, model } from 'mongoose';
import { EventProps } from '../../../Customer/domain/Event';

export const EventSchema = new Schema<EventProps>(
  {
    status: { type: Boolean, default: false },
    date: { type: String },
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile' },
  },
  { timestamps: true },
);

const EventModel = model<EventProps>('Event', EventSchema);

export { EventModel };
