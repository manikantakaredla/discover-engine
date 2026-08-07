import ClickEvent from '../../../models/ClickEvent.model.js';
import SearchEvent from '../../../models/SearchEvent.model.js';

export const extractSignals = async (sessionId) => {
  const clickSignals = await ClickEvent.find({ session: sessionId, action: { $in: ['click', 'view'] } }).populate('product');
  const searchSignals = await SearchEvent.find({ session: sessionId });
  const wishlistSignals = await ClickEvent.find({ session: sessionId, action: 'wishlist' }).populate('product');
  const cartSignals = await ClickEvent.find({ session: sessionId, action: 'cart' }).populate('product');
  const purchaseSignals = await ClickEvent.find({ session: sessionId, action: 'purchase' }).populate('product');

  return {
    clickSignals,
    searchSignals,
    wishlistSignals,
    cartSignals,
    purchaseSignals,
    totalCount: clickSignals.length + searchSignals.length + wishlistSignals.length + cartSignals.length + purchaseSignals.length
  };
};
