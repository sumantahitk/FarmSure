// controllers/searchController.js
import { Demand} from "../models/demand.js";

export const searchByName = async (req, res) => {
    try {
        const { query } = req.query; // e.g., ?query=rice
        
        if (!query) {
            return res.status(400).json({
                message: "Query parameter is required",
                success: false,
            });
        }

        // Perform a case-insensitive search for crop names that start with the query string
        const demands = await Demand.find({
            cropName: { $regex: `^${query}`, $options: 'i' } // Starts with query (case-insensitive)
        }).limit(10); // Limit results for performance

        const suggestions = demands.map(demand => demand);

        return res.status(200).json({
            message: "Search results",
            success: true,
            suggestions,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export const sortByPrice = async (req, res) => {
    try {
        const { cropName, sortOrder } = req.query; // e.g., ?cropName=wheat&sortOrder=asc

        if (!cropName) {
            return res.status(400).json({
                message: "Crop name is required",
                success: false,
            });
        }

        if (!sortOrder || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
            return res.status(400).json({
                message: "Valid sortOrder is required ('asc' or 'desc')",
                success: false,
            });
        }

        // Perform a case-insensitive search for crop names that match the cropName
        const demands = await Demand.find({
            cropName: { $regex: new RegExp(cropName, 'i') } // Case-insensitive search
        }).sort({ pricePerUnit: sortOrder === 'asc' ? 1 : -1 }); // Sort by price

        return res.status(200).json({
            message: "Filtered crops",
            success: true,
            demands,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

//this is modified this code 
export const sortByPriceAndName = async (req, res) => {
    try {
        const { cropName, sortOrder } = req.query; // e.g., ?cropName=wheat&sortOrder=asc

        if (!sortOrder && !cropName) {
            return res.status(400).json({
                message: "Crop name is required",
                success: false,
            });
        }
        if (!sortOrder && cropName) {
            if (!cropName) {
                return res.status(400).json({
                    message: "Query parameter is required",
                    success: false,
                });
            }
    
            // Perform a case-insensitive search for crop names that start with the query string
            const demands = await Demand.find({
                cropName: { $regex: `^${cropName}`, $options: 'i' } // Starts with query (case-insensitive)
            }).sort({ createdAt: -1 }).limit(10) .populate({ path: 'buyerId', select: 'username profilePicture' }); // Limit results for performance
    
            const suggestions = demands.map(demand => demand);
            console.log(suggestions);
            return res.status(200).json({
                message: "Search results",
                success: true,
                suggestions,
            });
        }
        

        if (!sortOrder || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
            return res.status(400).json({
                message: "Valid sortOrder is required ('asc' or 'desc')",
                success: false,
            });
        }

        // Perform a case-insensitive search for crop names that match the cropName
        const demands = await Demand.find({
            cropName: { $regex: new RegExp(cropName, 'i') } // Case-insensitive search
        }).sort({ pricePerUnit: sortOrder === 'asc' ? 1 : -1 }) .populate({ path: 'buyerId', select: 'username profilePicture' }); // Sort by price
        
        return res.status(200).json({
            message: "Filtered crops",
            success: true,
            demands,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};

export const sortByPriceAndName1 = async (req, res) => {
    try {
        const { cropName, sortOrder } = req.query; // e.g., ?cropName=wheat&sortOrder=asc

        // Validate cropName and sortOrder
        if (!sortOrder && !cropName) {
            return res.status(400).json({
                message: "Crop name is required",
                success: false,
            });
        }

        // Handle case where only cropName is provided (without sortOrder)
        if (!sortOrder && cropName) {
            const demands = await Demand.find({
                cropName: { $regex: `^${cropName}`, $options: 'i' } // Starts with query (case-insensitive)
            }).sort({ createdAt: -1 }).limit(10)
            .populate({ path: 'buyerId', select: 'username profilePicture' }); // Limit results for performance

            if (demands.length === 0) {
                return res.status(404).json({
                    message: "No crops found matching the query",
                    success: false,
                });
            }

            const suggestions = demands.map(demand => demand);

            return res.status(200).json({
                message: "Search results",
                success: true,
                suggestions,
            });
        }

        // Validate sortOrder if it's provided
        if (!sortOrder || (sortOrder !== 'asc' && sortOrder !== 'desc')) {
            return res.status(400).json({
                message: "Valid sortOrder is required ('asc' or 'desc')",
                success: false,
            });
        }

        // Search by cropName and sort by price
        const demands = await Demand.find({
            cropName: { $regex: new RegExp(cropName, 'i') } // Case-insensitive search
        }).sort({ pricePerUnit: sortOrder === 'asc' ? 1 : -1 })
        .populate({ path: 'buyerId', select: 'username profilePicture' }); // Sort by price

        if (demands.length === 0) {
            return res.status(404).json({
                message: "No crops found matching the query",
                success: false,
            });
        }

        return res.status(200).json({
            message: "Filtered crops",
            success: true,
            demands,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Server error",
            success: false,
        });
    }
};


