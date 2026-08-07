import mongoose from 'mongoose';

const searchEventSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    session: { type: String, required: true },
    query: { type: String, required: true },
    filters: { type: Map, of: String },
    resultsReturned: { type: Number, default: 0 },
    clickedProduct: { type: mongoose.Schema.ObjectId, ref: 'Product' },
    searchTimeMs: { type: Number },
    timestamp: { type: Date, default: Date.now },
  }
);

searchEventSchema.index({ session: 1, timestamp: -1 });
searchEventSchema.index({ query: 'text' });

const SearchEvent = mongoose.model('SearchEvent', searchEventSchema);

export default SearchEvent;
