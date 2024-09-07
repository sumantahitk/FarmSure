// controllers/contractController.js

import { Buyer } from '../models/buyer.js';
import { Contract } from '../models/contract.js';
import { Demand } from '../models/demand.js';
import { Farmer } from '../models/farmer.js';
import { User } from '../models/user.js';

// Controller to create a contract
export const createContract = async (req, res) => {
    try {
        const user=await User.findById(req.id);
        if(!user || user.userType==="buyer")
        {
            return res.status(403).json({
                message: "Only farmers can create contracts",
                success: false,
            });
        }
        const {  finalQuantity, finalPricePerUnit, finalDeliveryDate } = req.body;
        const demandId=req.params.id;
        

        // Find the demand
        const demand = await Demand.findById(demandId);

        if (!demand) {
            return res.status(404).json({
                message: "Demand not found",
                success: false,
            });
        }

        // Check if the demand is closed
        if (demand.status === 'Closed') {
            return res.status(400).json({
                message: "Cannot create contract. The demand is already closed.",
                success: false,
            });
        }

        const buyer=await Buyer.findById(demand.buyerId);
        const finalPrice= finalPricePerUnit* finalQuantity;
        // Create a new contract
        const contract = new Contract({
            demandId,
            farmerId: req.id, // Assuming req.user contains the logged-in farmer's info
            buyerId: demand.buyerId,
            cropName: demand.cropName,
            finalQuantity,
            finalPricePerUnit,
            finalDeliveryDate,
            finalPrice:finalPrice,
            farmerSignature: true, // Farmer has signed the contract
            buyerSignature: false, // Buyer hasn't signed yet
            status: 'Pending' // Initial status
        });
        
        // Save the contract to the database
        await contract.save();
        demand.status="In Negotiation";
        await demand.save();

        const populatedContract = await Contract.findById(contract._id)
        .populate({ path: 'buyerId', select: 'username' })
        .populate({ path: 'farmerId', select: 'username' });

        return res.status(201).json({
            message: "Contract created successfully",
            success: true,
            contract: populatedContract
            // contract,
            // contract: {
            //     ...contract.toObject(),
            //     farmerName: user.username,
            //     buyerName: buyer.username
            // },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


export const getContractDetails = async (req, res) => {
    try {
        const contractId = req.params.id;

        // Find the contract by ID and populate the necessary fields
        const contract = await Contract.findById(contractId)
            .populate({ path: 'buyerId', select: 'username' })
            .populate({ path: 'farmerId', select: 'username' });

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found",
                success: false,
            });
        }

        // Extract the buyerName and farmerName from the populated contract
        const buyerName = contract.buyerId.username;
        const farmerName = contract.farmerId.username;

        return res.status(200).json({
            message: "Contract details fetched successfully",
            success: true,
            contract: {
                ...contract.toObject(), // Convert the contract to a plain object
                buyerName, // Add buyerName to the response
                farmerName, // Add farmerName to the response
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

// controllers/contractController.js
export const respondToContract = async (req, res) => {
    try {
        const contractId = req.params.id;
        // console.log(req);
        console.log(req.params.id);
        console.log(contractId);
        const { action } = req.body; // Accept or Reject

        const contract = await Contract.findById(contractId);

        if (!contract) {
            return res.status(404).json({
                message: "Contract not found",
                success: false,
            });
        }
        const buyer= await Buyer.findById(req.id);
        const farmer =await Farmer.findById(contract.farmerId);
        const demand =await Demand.findById(contract.demandId);
        console.log('Buyer:', buyer);  // Log buyer to see if it's being retrieved correctly
        console.log('Farmer:', farmer);
        if (action === 'accept') {
            contract.status = 'Accepted';
            contract.buyerSignature = true;
            buyer.contractId=contractId;
            farmer.contractId=contractId;
            demand.status="Closed";
            await demand.save();
            await buyer.save();
            await farmer.save();
        } else if (action === 'reject') {
            contract.status = 'Rejected';
            demand.status="Open";
            await demand.save();
        } else {
            return res.status(400).json({
                message: "Invalid action",
                success: false
            });
        }

        await contract.save();

        return res.status(200).json({
            message: `Contract ${action}ed successfully`,
            success: true,
            contract
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false
        });
    }
};