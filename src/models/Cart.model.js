import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    products: [
      {
        product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, default: 1, min: 1 },
        addedAt: { type: Date, default: Date.now },
      },
    ],
    totalValue: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Cart = mongoose.model('Cart', cartSchema);

export default Cart;
