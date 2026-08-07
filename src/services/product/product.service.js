import Product from '../../models/Product.model.js';
import { ApiError } from '../../utils/ApiError.js';

export const createProduct = async (productData, userId) => {
  const product = new Product({
    ...productData,
    createdBy: userId,
  });
  return await product.save();
};

export const getProducts = async (query) => {
  const { keyword, category, sort, page = 1, limit = 10 } = query;
  
  let filter = { isDeleted: false };
  
  if (keyword) {
    filter.$or = [
      { title: { $regex: keyword, $options: 'i' } },
      { description: { $regex: keyword, $options: 'i' } }
    ];
  }
  
  if (category) {
    filter.category = category;
  }

  let sortOption = { createdAt: -1 };
  if (sort === 'price_asc') sortOption = { price: 1 };
  if (sort === 'price_desc') sortOption = { price: -1 };

  const skip = (Number(page) - 1) * Number(limit);

  const products = await Product.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const count = await Product.countDocuments(filter);

  return {
    products,
    page: Number(page),
    pages: Math.ceil(count / Number(limit)),
    total: count,
  };
};

export const getProductById = async (id) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  return product;
};

export const updateProduct = async (id, updateData, userId) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }

  Object.assign(product, updateData);
  product.updatedBy = userId;
  
  return await product.save();
};

export const deleteProduct = async (id, userId) => {
  const product = await Product.findOne({ _id: id, isDeleted: false });
  if (!product) {
    throw new ApiError(404, 'Product not found');
  }
  
  product.isDeleted = true;
  product.updatedBy = userId;
  await product.save();
  return true;
};
