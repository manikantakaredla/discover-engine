import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: String,
    default: 'anonymous'
  },
  eventType: {
    type: String,
    enum: ['page_view', 'search', 'product_click', 'add_to_cart', 'purchase', 'recommendation_click', 'complete_look_click', 'fbt_click'],
    required: true,
    index: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: function() {
      return ['product_click', 'add_to_cart', 'purchase'].includes(this.eventType);
    }
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  }
}, {
  timestamps: true
});

const Event = mongoose.models.Event || mongoose.model('Event', eventSchema);

export default Event;
