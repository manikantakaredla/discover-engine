import mongoose from 'mongoose';

const clickEventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' }, // Nullable for guests
    session: { type: String, required: true }, // Session ID
    product: { type: mongoose.Schema.ObjectId, ref: 'Product', required: true },
    action: { 
      type: String, 
      enum: ['view', 'click', 'wishlist', 'cart', 'purchase'], 
      required: true 
    },
    source: { type: String }, // e.g., 'home_recommendation', 'search_results', 'fbt'
    timestamp: { type: Date, default: Date.now },
  }
);

clickEventSchema.index({ session: 1, timestamp: -1 });
clickEventSchema.index({ user: 1, timestamp: -1 });
clickEventSchema.index({ product: 1, action: 1 });

const ClickEvent = mongoose.model('ClickEvent', clickEventSchema);

export default ClickEvent;
