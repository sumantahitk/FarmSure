// routes/contractRoutes.js
import express from "express";
import { createContract, respondToContract } from "../controllers/contractController.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";


const router = express.Router();

router.post("/:id/create", isAuthenticated,upload.none(), createContract);
router.post("/:id/respond", isAuthenticated,upload.none(), respondToContract);

export default router;