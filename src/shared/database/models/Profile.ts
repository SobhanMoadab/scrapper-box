import { Schema, model } from 'mongoose';
import { ProfileProps } from '../../../Customer/domain/Profile';

export const ProfileSchema = new Schema<ProfileProps>(
  {
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    siteUrl: { type: String },
    sitePassword: { type: String },
    siteUsername: { type: String },
    commentType: { type: String, enum: ['PRODUCT', 'POST'] },
    publishTime: { type: String },
    token: { type: String },
    commentLimit: { type: Number },
  },
  { timestamps: true },
);

const ProfileModel = model<ProfileProps>('Profile', ProfileSchema);

export { ProfileModel };
