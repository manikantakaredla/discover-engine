import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    price: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    stock: { type: Number, required: true, default: 0 },
    images: [{ type: String }],
    attributes: { type: Map, of: String },
    tags: [{ type: String }],
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    isDeleted: { type: Boolean, default: false }, // Soft Delete
    createdBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.ObjectId, ref: 'User' },
    embedding: [{ type: Number }], // For vector search later
  },
  { timestamps: true }
);

// Indexes for search and performance
productSchema.index({ title: 'text', description: 'text', brand: 'text', category: 'text' });
productSchema.index({ category: 1, price: 1 });
productSchema.index({ isDeleted: 1 });

const Product = mongoose.model('Product', productSchema);

export default Product;
