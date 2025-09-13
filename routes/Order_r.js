const express = require('express');
const router = express.Router();

const Order = require('../models/Order');
const OrderStatus = require('../models/OrderStatus');

// Route: Create a new order
router.post('/create-order', async (req, res) => {
  try {
    const { school_id, trustee_id, student_info, gateway_name } = req.body;

    const order = new Order({
      school_id,
      trustee_id,
      student_info,
      gateway_name
    });

    await order.save();
    res.status(201).json({ message: 'Order created successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Get all orders
router.get('/all-orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route: Update order status by order ID
router.put('/update-status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status, transaction_amount, payment_message } = req.body;

    const orderStatus = new OrderStatus({
      collect_id: orderId,
      status,
      transaction_amount,
      payment_message
    });

    await orderStatus.save();
    res.json({ message: 'Order status updated', orderStatus });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
