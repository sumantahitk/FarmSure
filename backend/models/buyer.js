// buyer model
import mongoose from 'mongoose';
import {User} from "../models/user.js"


const BuyerSchema = new mongoose.Schema({
  ...User.schema.obj, // Copy all fields from the User schema
  companyName:{type:String,require:true},
  contractId:[{type: mongoose.Schema.Types.ObjectId, ref: 'Contract', require: false}],
  demands: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Demand', require: false}],
  addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
});

// Export the Buyer model
export const Buyer = mongoose.model('Buyer', BuyerSchema);

