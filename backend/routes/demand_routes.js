import express from "express";

import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import { addNewDemand, deleteDemand, getAllDemands, getBuyerDemand, getDemandDetails } from "../controllers/demand_controller.js";


const router=express.Router();

// router.post("/createnew",addNewProduct);
router.post("/createnew",isAuthenticated,upload.single('image'),addNewDemand);
// router.post("/createnew",isAuthenticated,upload.none(),addNewDemand);
router.delete('/:id/delete',isAuthenticated,deleteDemand);
router.get("/alldemand", isAuthenticated, getAllDemands);
router.get("/buyerdemand",isAuthenticated,getBuyerDemand);
router.get('/demanddetails/:id', isAuthenticated, getDemandDetails);


export default router ;