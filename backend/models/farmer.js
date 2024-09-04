// farmer model
import mongoose from 'mongoose';
import { User} from './user.js';

const FarmerSchema = new mongoose.Schema({
  ...User.schema.obj, // Copy all fields from the User schema
  contractId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Contract', require: false}],
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
}, { timestamps: true });

// Export the Farmer model
export const Farmer = mongoose.model('Farmer', FarmerSchema);

