import express from "express";
const router =express.Router();
import{
    addOrderItems,
    getMyOrders,
    getOrderById,
    updateOrderToPaid,
    updateOrderToDelivered,
    getOrders,
} from '../controllers/orderController.js';

import {protect,admin} from '../middleware/authMiddleware.js';

router.route('/').post(protect,addOrderItems).get(protect,admin, getOrders);
router.route('/mine').get(product,getMyOrders);
router.route('/:id').get(protect,getOrderById);
router.route('/:id/pay').get(protect,updateOrderToPaid);
router.route('/:id/deliver').get(protect,updateOrderToDelivered);


export default router;