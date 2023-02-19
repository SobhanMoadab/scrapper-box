import { Schema, model } from 'mongoose';
import { CustomerProps } from '../../../Customer/domain/Customer';

export const CustomerSchema = new Schema<CustomerProps>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
  },
  { timestamps: true },
);

const CustomerModel = model<CustomerProps>('Customer', CustomerSchema);

export { CustomerModel };
