import mongoose from 'mongoose';
import { INTENT_LIFECYCLE } from '../constants/intentTypes.js';

const intentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.ObjectId, ref: 'User' }, // Nullable for guests
    sessionId: { type: String, required: true },
    
    primaryIntent: {
      name: { type: String, default: 'Unknown' },
      confidence: { type: Number, default: 0 }
    },

    secondaryIntents: [
      {
        name: { type: String },
        confidence: { type: Number }
      }
    ],

    intentEvidence: [
      {
        source: { type: String }, // e.g., 'Search', 'Cart'
        value: { type: String },  // e.g., 'Running Shoes'
        score: { type: Number }
      }
    ],

    intentTimeline: [
      {
        intent: { type: String },
        confidence: { type: Number },
        timestamp: { type: Date, default: Date.now },
        reason: { type: String }
      }
    ],

    intentContext: {
      dominantCategory: String,
      dominantBrand: String,
      dominantSearch: String,
      dominantPriceRange: String,
      sessionStage: String
    },

    confidenceBreakdown: {
      overall: { type: Number, default: 0 },
      click: { type: Number, default: 0 },
      search: { type: Number, default: 0 },
      wishlist: { type: Number, default: 0 },
      cart: { type: Number, default: 0 },
      purchase: { type: Number, default: 0 }
    },

    intentHealth: {
      stability: { type: Number, default: 0 },
      volatility: { type: Number, default: 0 },
      consistency: { type: Number, default: 0 }
    },

    signals: {
      clickSignals: [{ type: mongoose.Schema.ObjectId, ref: 'ClickEvent' }],
      searchSignals: [{ type: mongoose.Schema.ObjectId, ref: 'SearchEvent' }],
      wishlistSignals: [{ type: mongoose.Schema.ObjectId, ref: 'ClickEvent' }], // action='wishlist'
      cartSignals: [{ type: mongoose.Schema.ObjectId, ref: 'ClickEvent' }],     // action='cart'
      purchaseSignals: [{ type: mongoose.Schema.ObjectId, ref: 'ClickEvent' }]  // action='purchase'
    },

    transition: {
      previousIntent: { type: String },
      currentIntent: { type: String },
      confidenceShift: { type: Number },
      transitionReason: [{ type: String }]
    },

    engagementScore: { type: Number, default: 0 },
    
    status: {
      type: String,
      enum: Object.values(INTENT_LIFECYCLE),
      default: INTENT_LIFECYCLE.UNKNOWN
    },
  },
  { timestamps: true }
);

intentSchema.index({ sessionId: 1 });
intentSchema.index({ userId: 1 });

const Intent = mongoose.model('Intent', intentSchema);

export default Intent;
