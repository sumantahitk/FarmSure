// routes/searchRoutes.js
import express from 'express';

import isAuthenticated from "../middlewares/isAuthenticated.js";
import { searchByName, sortByPrice, sortByPriceAndName } from '../controllers/searchController.js';

const router = express.Router();

router.get('/byname',isAuthenticated,searchByName );
// router.get('/sortbyprice',isAuthenticated, sortByPrice);
router.get('/sortbypriceandname',isAuthenticated, sortByPriceAndName);

export default router;
