import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import Wishlist from '../models/Wishlist.model.js';

export const getWishlist = asyncHandler(async (req, res) => {
  let wishlist = await Wishlist.findOne({ user: req.user._id }).populate('products.product');
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [] });
  }
  res.status(200).json(new ApiResponse(200, wishlist, 'Wishlist fetched'));
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.body;
  let wishlist = await Wishlist.findOne({ user: req.user._id });
  
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: req.user._id, products: [{ product: productId }] });
  } else {
    const exists = wishlist.products.find(p => p.product.toString() === productId);
    if (!exists) {
      wishlist.products.push({ product: productId });
      await wishlist.save();
    }
  }

  res.status(200).json(new ApiResponse(200, wishlist, 'Added to wishlist'));
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const wishlist = await Wishlist.findOne({ user: req.user._id });
  
  if (wishlist) {
    wishlist.products = wishlist.products.filter(p => p.product.toString() !== productId);
    await wishlist.save();
  }

  res.status(200).json(new ApiResponse(200, wishlist, 'Removed from wishlist'));
});
