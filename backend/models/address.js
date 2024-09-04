// buyer model
import mongoose from 'mongoose';
import {User} from "../models/user.js"


const AddressSchema = new mongoose.Schema({
        addressLine1: { type: String, default: '' }, // Street address
        addressLine2: { type: String, default: '' }, // Additional address info
        city: { type: String ,default:''},
        state: { type: String,default:'' },
        country: { type: String,default:'' },
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
}, { timestamps: true });

// Export the Buyer model
export const Address = mongoose.model('Address', AddressSchema);

