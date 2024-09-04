// user model
import mongoose from 'mongoose';

// Base User Schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, enum: ['farmer', 'buyer'], required: true },
  profilePicture: { type: String ,default:''}, // URL to profile picture
  contactNumber: { type: String, required: true }, // Phone number
  address:{type: mongoose.Schema.Types.ObjectId, ref: 'Address'},
},{timestamps:true});

// Export the base User model
export const User = mongoose.model('User', UserSchema);
