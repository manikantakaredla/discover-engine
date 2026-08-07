export const intentWeights = {
  // Base interaction weights (percentages out of 100 max per action type if normalized, or raw score points)
  CLICK: 20,
  SEARCH: 20,
  WISHLIST: 15,
  CART: 35,
  PURCHASE: 10, // Might seem low, but purchase is usually terminal (end of intent). Adjust based on business logic.

  // Multipliers for repeated behaviors
  REPEATED_CLICK_BONUS: 5,
  REPEATED_SEARCH_BONUS: 8,
  REPEATED_CART_BONUS: 15,
};
