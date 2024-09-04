// product_controller.js

import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";

import { Demand} from "../models/demand.js";

import mongoose from 'mongoose';
import { Buyer } from "../models/buyer.js";


export const addNewDemand = async (req, res) => {
    try {
        const {cropName, quantity, pricePerUnit, description ,expectedDate,status} = req.body;
        const image = req.file;
        // console.log(req.id);
        const buyer_id= req.id;
        console.log(req.body);
        if ( !image) {
            return res.status(400).json({ message: 'Required fields are missing image.' });
        }
          //image upload
          const optimizedImageBuffer = await sharp(image.buffer)
          .resize({ width: 800, height: 800, fit: 'inside' })
          .toFormat('jpeg', { quality: 80 })
          .toBuffer();
      //buffer to datauri convert
      const fileuri = `data:image/jpeg;base64,${optimizedImageBuffer.toString('base64')}`;

        const cloudResponse = await cloudinary.uploader.upload(fileuri);

        const demand = await Demand.create({
            description,
            image: cloudResponse.secure_url,
            buyerId: buyer_id,
            cropName,
            quantity,
            pricePerUnit,
            expectedDate,
            // expectedDate: new Date(expectedDate),
            status
        });
        // console.log(product._id);
        console.log(demand.expectedDate);

        const buyer = await Buyer.findById(buyer_id).populate("demands");
//        


        if (buyer) {
            buyer.demands.push(demand._id);
            await buyer.save();
        }else {
            return res.status(404).json({ message: 'buyer not found' });
        }

        await demand.populate({ path: 'buyerId', select: '-password' });

        return res.status(201).json({
            message: 'New demand added',
            demand,
            success: true
        })
    } catch (err) {
        console.log(err);
    }
}

//delete Product

export const deleteDemand = async (req, res) => {
    try {
        const  demandId  = req.params.id;
        const buyerId = req.id; // Assuming the farmer's ID is extracted from authentication middleware
        console.log(demandId);
        console.log(buyerId);

        if (!demandId || !buyerId) {
            return res.status(400).json({ message: 'Required fields are missing.' });
        }

        // Find the product
        const demand = await Demand.findById(demandId);

        if (!demand) {
            return res.status(404).json({ message: 'Product not found.', success:false });
        }

        // Check if the product belongs to the authenticated farmer
        if (demand.buyerId.toString() !== buyerId) {
            return res.status(403).json({ message: 'You are not authorized to delete this demand.' });
        }

        // Delete the product
        await Demand.findByIdAndDelete(demandId);

        // Remove product from the farmer's product list
        await Demand.findByIdAndUpdate(buyerId, {
            $pull: { demands: demandId }
        });

        return res.status(200).json({
            message: 'demand deleted successfully.',
            success: true
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'An error occurred while deleting the product.' });
    }
};

//get All Product


export const getAllDemands = async (_req, res) => {
    try {
        const demands = await Demand.find().sort({ createdAt: -1 })
        // console.log(products);
            .populate({ path: 'buyerId', select: 'username profilePicture' }) // Assuming farmerId is the user
            // .populate({
            //     path: 'reviews', sort: { createdAt: -1 },  // Replacing comments with reviews
            //     populate: { path: 'farmerId', select: 'username profilePicture' }
            // });
console.log(demands);
        return res.status(200).json({
            demands,
            success: true
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Server error', success: false });
    }
};


// controllers/farmer_controller.js

export const getBuyerDemand = async (req, res) => {
    try {
        const buyerId = req.id; // Assuming the farmer's ID is obtained from middleware (e.g., isAuthenticated)

        // Find the farmer by ID
        const buyer = await Buyer.findById(buyerId).populate('demands');

        if (!buyer) {
            return res.status(404).json({
                message: "buyer not found",
                success: false
            });
        }

        // Get all products associated with the farmer
        const demands = await Demand.find({ buyerId: buyerId });

        return res.status(200).json({
            demands,
            success: true
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};


// controllers/demandDetailsController.js


export const getDemandDetails = async (req, res) => {
    try {
        const { id } = req.params; // ID of the demand

        // Find the demand by ID and populate the buyer details (if needed)
        const demand = await Demand.findById(id).populate({ path: 'buyerId', select: 'username profilePicture companyName' })

        if (!demand) {
            return res.status(404).json({
                message: "Demand not found",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Demand details fetched successfully",
            success: true,
            demand,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


