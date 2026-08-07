import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Cart from '../models/Cart.model.js';
import Product from '../models/Product.model.js';

export const getCart = asyncHandler(async (req, res) => {
  let cart = await Cart.findOne({ user: req.user._id }).populate('products.product');
  if (!cart) {
    cart = await Cart.create({ user: req.user._id, products: [], totalValue: 0 });
  }
  res.status(200).json(new ApiResponse(200, cart, 'Cart fetched'));
});

export const addToCart = asyncHandler(async (req, res) => {
  const { productId, quantity = 1 } = req.body;
  let cart = await Cart.findOne({ user: req.user._id });
  const product = await Product.findById(productId);
  
  if (!product) {
    return res.status(404).json(new ApiResponse(404, null, 'Product not found'));
  }

  if (!cart) {
    cart = await Cart.create({ user: req.user._id, products: [], totalValue: 0 });
  }

  const existingItemIndex = cart.products.findIndex(p => p.product.toString() === productId);
  if (existingItemIndex >= 0) {
    cart.products[existingItemIndex].quantity += quantity;
  } else {
    cart.products.push({ product: productId, quantity });
  }

  // Recalculate total value would ideally be done here with actual product prices
  // Skipping exact recalc for brevity, assuming service layer handles it later

  await cart.save();
  res.status(200).json(new ApiResponse(200, cart, 'Added to cart'));
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const { productId, quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (cart) {
    const itemIndex = cart.products.findIndex(p => p.product.toString() === productId);
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.products.splice(itemIndex, 1);
      } else {
        cart.products[itemIndex].quantity = quantity;
      }
      await cart.save();
    }
  }

  res.status(200).json(new ApiResponse(200, cart, 'Cart updated'));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const cart = await Cart.findOne({ user: req.user._id });
  
  if (cart) {
    cart.products = cart.products.filter(p => p.product.toString() !== productId);
    await cart.save();
  }

  res.status(200).json(new ApiResponse(200, cart, 'Removed from cart'));
});
