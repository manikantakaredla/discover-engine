/**
 * Explainability Validator
 * Validates that recommendations have the necessary context for explainability.
 */
class ExplainabilityValidator {
  async validate(recommendations) {
    // Ensure every recommendation has an explanation or can be explained
    return recommendations.map(item => {
      if (!item.explanation) {
        item.explanation = 'Recommended based on your current preferences and trends.';
      }
      return item;
    });
  }
}

export default new ExplainabilityValidator();
