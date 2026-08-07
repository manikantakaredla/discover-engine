/**
 * Safety Validator
 * Blocks restricted or inactive products.
 */
class SafetyValidator {
  async validate(recommendations) {
    // Filter out items that are inactive, out of stock, or restricted
    return recommendations.filter(item => {
      const isRestricted = item.tags && item.tags.includes('restricted');
      const isInactive = item.status === 'inactive';
      return !isRestricted && !isInactive;
    });
  }
}

export default new SafetyValidator();
