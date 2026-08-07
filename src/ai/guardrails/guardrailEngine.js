/**
 * AI Guardrails Engine
 * Orchestrates all guardrail checks to ensure DPDP compliance and
 * deterministic, explainable results.
 */
import policyValidator from './policyValidator.js';
import biasChecker from './biasChecker.js';
import diversityValidator from './diversityValidator.js';
import safetyValidator from './safetyValidator.js';
import explainabilityValidator from './explainabilityValidator.js';

class GuardrailEngine {
  /**
   * Applies all guardrails to the list of recommendations.
   * @param {Array} recommendations 
   * @returns {Object} result containing filtered recommendations and metrics
   */
  async applyGuardrails(recommendations) {
    let filtered = [...recommendations];
    
    // 1. Policy & DPDP
    filtered = await policyValidator.validate(filtered);
    
    // 2. Safety (Block restricted products)
    filtered = await safetyValidator.validate(filtered);
    
    // 3. Remove Duplicates (Part of Diversity/Policy)
    const beforeDupCount = filtered.length;
    filtered = this.removeDuplicates(filtered);
    const duplicatesRemoved = beforeDupCount - filtered.length;
    
    // 4. Bias Check
    filtered = await biasChecker.validate(filtered);
    
    // 5. Diversity Check (Ensure category diversity <= 35%)
    const diversityResult = await diversityValidator.validate(filtered);
    filtered = diversityResult.recommendations;
    
    // 6. Explainability Validator
    filtered = await explainabilityValidator.validate(filtered);
    
    return {
      filteredRecommendations: filtered,
      metrics: {
        duplicatesRemoved,
        diversityScore: diversityResult.score,
        finalCount: filtered.length,
      }
    };
  }

  removeDuplicates(recommendations) {
    const seen = new Set();
    return recommendations.filter(item => {
      const duplicate = seen.has(item.id);
      seen.add(item.id);
      return !duplicate;
    });
  }
}

export default new GuardrailEngine();
