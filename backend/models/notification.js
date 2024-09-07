// models/notification.js

import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
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
    contractId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Contract', // Assuming you have a Contract model
        required: true
    },
    message: {
        type: String,
        required: true
    },
    senderType: {
        type: String,
        enum: ['farmer', 'buyer'],
        required: true
    },
    status: {
        type: String,
        enum: ['Unread', 'Read'],
        default: 'Unread'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export const Notification = mongoose.model('Notification', notificationSchema);
