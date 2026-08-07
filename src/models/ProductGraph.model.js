import mongoose from 'mongoose';

const productGraphSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: true,
      unique: true,
    },
    relatedProducts: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        similarityScore: { type: Number, min: 0, max: 1 },
      },
    ],
    frequentlyBoughtTogether: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        confidence: { type: Number, min: 0, max: 1 },
      },
    ],
    completeLook: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product' },
        category: String, // e.g., 'shoes', 'belt'
      },
    ],
    accessories: [
      { type: mongoose.Schema.ObjectId, ref: 'Product' },
    ],
  },
  { timestamps: true }
);

const ProductGraph = mongoose.model('ProductGraph', productGraphSchema);

export default ProductGraph;
