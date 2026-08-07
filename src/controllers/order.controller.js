import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Order from '../models/Order.model.js';
import Cart from '../models/Cart.model.js';

export const createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart || cart.products.length === 0) {
    return res.status(400).json(new ApiResponse(400, null, 'Cart is empty'));
  }

  const orderProducts = cart.products.map(item => ({
    product: item.product._id,
    quantity: item.quantity,
    priceAtPurchase: item.product.price,
  }));

  const totalAmount = orderProducts.reduce((acc, item) => acc + (item.priceAtPurchase * item.quantity), 0);

  const order = await Order.create({
    user: req.user._id,
    products: orderProducts,
    totalAmount,
    shippingAddress: req.body.shippingAddress,
  });

  // Clear cart
  cart.products = [];
  cart.totalValue = 0;
  await cart.save();

  res.status(201).json(new ApiResponse(201, order, 'Order created successfully'));
});

export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(200, orders, 'Orders fetched'));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('products.product');
  if (!order) {
    return res.status(404).json(new ApiResponse(404, null, 'Order not found'));
  }
  // Check if admin or owner
  if (order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
    return res.status(403).json(new ApiResponse(403, null, 'Not authorized'));
  }
  res.status(200).json(new ApiResponse(200, order, 'Order fetched'));
});
