// user_controller.js
import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { User } from "../models/user.js";
import { Farmer } from "../models/farmer.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Buyer } from "../models/buyer.js";
import { Address } from "../models/address.js";

export const register = async (req, res) => {
    try {
        const { username, email, password ,contactNumber, userType ,companyName} = req.body;
        // console.log("req.body:",req.body);
        if (!username || !email || !password ||!contactNumber||! userType) {
            return res.status(401).json({
                message: "Something is missing,Please check!",
                success: false,
                
            });
        }
console.log("hi");
        // Validate companyName if userType is buyer
        if (userType === "buyer" && !companyName) {
            return res.status(401).json({
                message: "Company name is required for buyers.",
                success: false,
            });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(401).json({
                message: "Email Id already register,Please Try Another Id",
                success: false,
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
       const newUser= await User.create({
            username,
            email,
            contactNumber,
            userType,
            password: hashedPassword,
            // address: {
            //     city: address?.city || '',
            //     state: address?.state || '',
            //     country: address?.country || ''
            // },
        })

        if (userType === "farmer") {
            await Farmer.create({
                _id: newUser._id, // Link Farmer document to User document
                username,
                email,
                contactNumber,
                userType,
                password: hashedPassword,
                contractId: [], // Assuming no contract initially
                // address,
            });
        }
        if (userType === "buyer") {
            await Buyer.create({
                _id: newUser._id, // Link Farmer document to User document
                username,
                email,
                contactNumber,
                userType,
                password: hashedPassword,
                contractId:[], // Assuming no contract initially
                demands:[], // Assuming no demand initially
                companyName,
                // address,
            });
        }
        
        return res.status(201).json({
            message: "Account Created Successfully",
            success: true,
        });
    }
    catch (error) {
        console.log(error);
    }
}


export const login = async (req,res) =>{
    try{
        const {email,password}=req.body;
        if (!email || !password) {
            return res.status(401).json({
                message: "Something is missing,Please check!",
                success: false,
            });                                                                                 
        }
        let user= await User.findOne({email});
        if (!user) {
            return res.status(401).json({
                message: "Incorrect Email or Password !",
                success: false,
            });
        }
        const isPasswordMatch= await bcrypt.compare(password,user.password);
        if(!isPasswordMatch)
        {
            return res.status(401).json({
                message: "Incorrect Email or Password !",
                success: false,
            });
        }
        const token = await jwt.sign({userId:user._id},process.env.SECRET_KEY,{expiresIn:'1d'});

        user ={
            _id:user._id,
            username:user.username,
            email:user.email,
            profilePicture:user.profilePicture,
            bio:user.bio,
            userType:user.userType,
            contactNumber:user.contactNumber,
            address:user.address,
        }
       
        return res.cookie('token',token,{httpOnly:true,sameSite:'strict',maxAge:1*24*60*60*1000}).json({
            message:`Welcome back ${user.username}`,
            success:true,
            user
        })
    }catch(error)
    {
        console.log(error);
    }
};

export const logout =async (_,res)=>{
    try{
        return res.cookie("token","",{maxAge:0}).json({
            message:'Logged out Successfully.',
            success:true
        })
    }catch(error)
    {
        console.log(error);
    }
}


export const editProfile = async (req, res) => {
    try {
        const { username, contactNumber, companyName } = req.body;
        const userId = req.id; // Assuming user ID is obtained from authentication middleware

        if (!userId) {
            return res.status(401).json({
                message: "User ID is required",
                success: false,
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Update user information
        const updatedUser = await User.findByIdAndUpdate(userId, {
            username,
            contactNumber,
        
        }, { new: true }); // Ensure to return the updated document
        await updatedUser.save();
        if (!updatedUser) {
            return res.status(500).json({
                message: "Failed to update user",
                success: false,
            });
        }

        // Update Farmer or Buyer model based on userType
        if (user.userType === 'farmer') {
            const updatedFarmer = await Farmer.findByIdAndUpdate(userId, {
                username,
                contactNumber,
              
            }, { new: true });
            await updatedFarmer.save();
            if (!updatedFarmer) {
                return res.status(500).json({
                    message: "Failed to update farmer details",
                    success: false,
                });
            }
            return res.status(200).json({
                message: "Profile updated successfully",
                
                updatedFarmer,
                success: true,
            });
        }

        if (user.userType === 'buyer') {
            const updatedBuyer = await Buyer.findByIdAndUpdate(userId, {
                username,
                contactNumber,
               
                companyName: companyName || user.companyName, // Update companyName if provided
            }, { new: true });
            await updatedBuyer.save();
            if (!updatedBuyer) {
                return res.status(500).json({
                    message: "Failed to update buyer details",
                    success: false,
                });
            }
            return res.status(200).json({
                message: "Profile updated successfully",
               
                updatedBuyer,
               
                success: true,
            });
        }

        // return res.status(200).json({
        //     message: "Profile updated successfully",
            
           
        //     updatedFarmer,
        //     success: true,
        // });
    } catch (error) {
        
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
       
    }
};


export const addressUpdate = async (req, res) => {
    try {
        const { addressLine1, addressLine2, city, state, country } = req.body;
        const userId = req.id; // Assuming user ID is obtained from authentication middleware

        if (!userId) {
            return res.status(401).json({
                message: "User ID is required",
                success: false,
            });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false,
            });
        }

        // Check if the user already has an address
        let address = await Address.findOne({ userId });

        if (address) {
            // Update existing address
            address.addressLine1 = addressLine1 || address.addressLine1;
            address.addressLine2 = addressLine2 || address.addressLine2;
            address.city = city || address.city;
            address.state = state || address.state;
            address.country = country || address.country;

            await address.save();
        } else {
            // Create a new address
            address = await Address.create({
                addressLine1,
                addressLine2,
                city,
                state,
                country,
                userId
            });
        }

        // Update User model
        user.address = address._id;
        await user.save();

        // Update Farmer or Buyer model based on userType
        if (user.userType === 'farmer') {
            await Farmer.findOneAndUpdate(
                { _id: userId },
                { addressId: address._id },
                { new: true }
            );
        }

        if (user.userType === 'buyer') {
            await Buyer.findOneAndUpdate(
                { _id: userId },
                { addressId: address._id },
                { new: true }
            );
        }

        return res.status(200).json({
            message: "Address updated successfully",
            address,
            success: true,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};
    
export const updateProfilePicture = async (req, res) => {
        try {
            const userId = req.id; // Extracted from authentication middleware
            const image = req.file;
    
            if (!image) {
                return res.status(400).json({
                    message: "Image file is required.",
                    success: false,
                });
            }
    
            // Optimize image
            const optimizedImageBuffer = await sharp(image.buffer)
                .resize({ width: 800, height: 800, fit: 'inside' })
                .toFormat('jpeg', { quality: 80 })
                .toBuffer();
            const fileuri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;
    
            // Upload image to Cloudinary
            const cloudResponse = await cloudinary.uploader.upload(fileuri);
            const profilePictureUrl = cloudResponse.secure_url;
    
            // Update User model
            const updatedUser = await User.findByIdAndUpdate(
                userId,
                { profilePicture: profilePictureUrl },
                { new: true }
            );
    
            if (!updatedUser) {
                return res.status(404).json({
                    message: "User not found.",
                    success: false,
                });
            }
    
            // Update Buyer or Farmer model
            if (updatedUser.userType === "farmer") {
                await Farmer.findByIdAndUpdate(
                    userId,
                    { profilePicture: profilePictureUrl },
                    { new: true }
                );
            }
    
            if (updatedUser.userType === "buyer") {
                await Buyer.findByIdAndUpdate(
                    userId,
                    { profilePicture: profilePictureUrl },
                    { new: true }
                );
            }
    
            return res.status(200).json({
                message: "Profile picture updated successfully.",
                success: true,
                profilePicture: profilePictureUrl,
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: "Server error.",
                success: false,
            });
        }
    };