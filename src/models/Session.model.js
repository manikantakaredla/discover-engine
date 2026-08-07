import mongoose from 'mongoose';
import { SESSION_PHASE } from '../constants/intentTypes.js';

const sessionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    sessionId: { type: String, required: true, unique: true },
    device: String,
    browser: String,
    ip: String,
    
    currentIntent: { type: String, default: 'Unknown' },
    sessionPhase: { 
      type: String, 
      enum: Object.values(SESSION_PHASE),
      default: SESSION_PHASE.BROWSING 
    },
    
    sessionHeat: {
      intensity: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Low' },
      engagementScore: { type: Number, default: 0 },
      totalInteractions: { type: Number, default: 0 }
    },

    startTime: { type: Date, default: Date.now },
    endTime: { type: Date },
    duration: { type: Number }, // in seconds
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

sessionSchema.index({ sessionId: 1 });
sessionSchema.index({ user: 1 });

const Session = mongoose.model('Session', sessionSchema);

export default Session;
