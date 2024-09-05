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
};     export const respondToContract = async (req, res) => {
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
};    this is print in console :-66d20b6e861acb1ad7de6d69
66d20b6e861acb1ad7de6d69
TypeError: Cannot set properties of null (setting 'contractId')
    at respondToContract (file:///C:/HackHeritage/backend/controllers/contractController.js:102:29)
    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
thunder client print:- "message": "Server error",
  "success": false










const buyer = await Buyer.findById(req.id);
const farmer = await Farmer.findById(contract.farmerId);

console.log('Buyer:', buyer);  // Log buyer to see if it's being retrieved correctly
console.log('Farmer:', farmer);  // Log farmer to see if it's being retrieved correctly
