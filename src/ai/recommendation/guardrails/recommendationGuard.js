export const enforceGuardrails = (rankedCandidates) => {
  const safeCandidates = [];
  const seenIds = new Set();
  
  let totalProcessed = 0;
  
  for (const candidate of rankedCandidates) {
    const p = candidate.product;
    const id = p._id.toString();
    
    // Guardrail 1: No duplicates
    if (seenIds.has(id)) continue;
    
    // Guardrail 2: No out-of-stock products
    if (p.stock <= 0) continue;
    
    // Guardrail 3: Remove unsafe/inactive products
    if (p.isDeleted || p.status === 'inactive') continue;

    // Passed
    seenIds.add(id);
    safeCandidates.push(candidate);
    totalProcessed++;
  }

  return { safeCandidates, count: totalProcessed };
};
