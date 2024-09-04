// review model
import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
    buyerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Buyer',
        required: true,
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
    
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comment: {
        type: String,
        default:"" // Comments are optional
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

// Method to calculate average rating for a user
// reviewSchema.statics.calculateAverageRating = async function (userId) {
//     const result = await this.aggregate([
//         { $match: { reviewee: mongoose.Types.ObjectId(userId) } },
//         { $group: { _id: '$reviewee', avgRating: { $avg: '$rating' } } },
//     ]);

//     return result.length > 0 ? result[0].avgRating : null;
// };

export const Review = mongoose.model('Review', reviewSchema);
