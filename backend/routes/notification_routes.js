// routes/notificationRoutes.js

import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { createNotificationForSignedDeal } from '../controllers/notificationController';
import { handleBuyerResponseToContract } from '../controllers/notificationController';
import { markNotificationAsRead } from '../controllers/notificationController';
import { getNotificationsForFarmer } from '../controllers/notificationController';
import { getNotificationsForBuyer } from '../controllers/notificationController';


const router = express.Router();

router.post('/signdeal/:demandId/:contractId',isAuthenticated, createNotificationForSignedDeal);
router.post('/response/:notificationId',isAuthenticated, handleBuyerResponseToContract);
router.get('/farmer', isAuthenticated, getNotificationsForFarmer);
router.get('/buyer', isAuthenticated, getNotificationsForBuyer);
router.put('/:notificationId/read', isAuthenticated,markNotificationAsRead);

export default router;
