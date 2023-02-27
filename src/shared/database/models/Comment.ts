import { Schema, model } from 'mongoose';
import { CommentProps } from '../../../Customer/domain/Comment';
import { CustomerProps } from '../../../Customer/domain/Customer';

export const CommentSchema = new Schema<CommentProps>(
  {
    comment: { type: Schema.Types.Mixed },
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile' },
    publishDate: { type: Date },
    status: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const CommentModel = model<CommentProps>('Comment', CommentSchema);

export { CommentModel };
