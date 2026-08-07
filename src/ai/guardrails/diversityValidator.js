/**
 * Diversity Validator
 * Ensures that no single category exceeds 35% of the total recommendations.
 */
class DiversityValidator {
  async validate(recommendations) {
    if (recommendations.length === 0) return { recommendations, score: 100 };
    
    const categoryCounts = {};
    recommendations.forEach(item => {
      const cat = item.category || 'unknown';
      categoryCounts[cat] = (categoryCounts[cat] || 0) + 1;
    });

    const maxAllowed = Math.ceil(recommendations.length * 0.35);
    const filtered = [];
    const currentCounts = {};

    // Basic implementation: greedy filtering
    // In a production scenario, this might re-rank or fetch more items instead of just dropping
    for (const item of recommendations) {
      const cat = item.category || 'unknown';
      currentCounts[cat] = currentCounts[cat] || 0;
      
      if (currentCounts[cat] < maxAllowed) {
        filtered.push(item);
        currentCounts[cat]++;
      }
    }

    // Calculate a dummy diversity score based on distribution
    const numCategories = Object.keys(categoryCounts).length;
    const score = Math.min(100, Math.round((numCategories / recommendations.length) * 100) + 70);

    return { recommendations: filtered, score: Math.min(100, score) };
  }
}

export default new DiversityValidator();
