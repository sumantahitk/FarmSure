// demand model
import mongoose from 'mongoose';

const demandSchema = new mongoose.Schema({
    buyerId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Buyer',
        required: true
    },
    cropName: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    pricePerUnit: {
        type: Number,
        required: true,
    },
   
    description:{
        type:String,
        default:"",
    },
    expectedDate:{
        type:Date,
        default:Date.now,
    },
    status: {
        type: String,
        enum: ['Open', 'Closed', 'In Negotiation'],
        default: 'Open',
    },
    image: {
        type: String,
        default: "",
    }
},{timestamps:true});

// Method to calculate total value of the product
// productSchema.methods.calculateTotalValue = function () {
//     return this.price * this.quantityAvailable;
// };

export const Demand = mongoose.model('Demand', demandSchema);
