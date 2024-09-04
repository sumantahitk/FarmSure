// models/contract.js
import mongoose from "mongoose";

const contractSchema = new mongoose.Schema({
    farmerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Farmer',
        required: true 
    },
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buyer',
        required: true 
    },
    demandId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Demand',
        required: true 
    },
    cropName: {
        type: String,
        required: true
    },
    finalQuantity: {
        type: Number,
        required: true
    },
    finalPricePerUnit: {
        type: Number,
        required: true
    },
    finalDeliveryDate: {
        type: Date,
        required: true
    },
    finalPrice:{
      type:Number,
      default:"",
    },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'],
        default: 'Pending'
    },
    farmerSignature: {
        type: Boolean,
        default: false
    },
    buyerSignature: {
        type: Boolean,
        default: false
    },
}, { timestamps: true });

export const Contract = mongoose.model('Contract', contractSchema);