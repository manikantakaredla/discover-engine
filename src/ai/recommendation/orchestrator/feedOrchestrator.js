import { determineStrategy } from '../strategies/strategyEngine.js';
import { fetchByIntentRules, fetchTrending, fetchNewArrivals } from '../providers/ruleProvider.js';
import { mergeCandidates } from '../retrieval/candidateMerger.js';
import { rankCandidates } from '../ranking/rankingEngine.js';
import { enforceGuardrails } from '../guardrails/recommendationGuard.js';
import { applyDiversityFilter } from '../filters/diversityFilter.js';
import { generateExplorationMix } from '../discovery/discoveryEngine.js';
import { generateCompleteLook } from '../bundles/completeLook.js';
import { generateFrequentlyBought } from '../bundles/frequentlyBought.js';
import { buildFeedSections, formatFinalResponse } from './feedBuilder.js';

export const orchestrateHomeFeed = async (intentDoc, sessionDoc) => {
  const startTime = Date.now();

  // 1. Strategy Engine
  const strategy = determineStrategy(intentDoc, sessionDoc);
  
  const intentContext = intentDoc ? intentDoc.intentContext : null;
  const categories = intentContext ? [intentContext.dominantCategory] : [];
  const brands = intentContext ? [intentContext.dominantBrand] : [];

  // 2. Retrieval (Parallel Execution for latency)
  const retrievalStart = Date.now();
  let intentCandidates = [];
  let trendingCandidates = [];
  let newArrivals = [];

  if (strategy === 'INTENT_STRATEGY' || strategy === 'PERSONALIZED_STRATEGY') {
    intentCandidates = await fetchByIntentRules(intentDoc.primaryIntent.name, categories, brands, 30);
  }
  
  trendingCandidates = await fetchTrending(20);
  newArrivals = await fetchNewArrivals(15);
  const retrievalTime = Date.now() - retrievalStart;

  // 3. Candidate Merge
  const mergedCandidates = mergeCandidates(intentCandidates, [], trendingCandidates);
  const candidateCount = mergedCandidates.length;

  // 4. Ranking Engine
  const rankingStart = Date.now();
  const ranked = rankCandidates(mergedCandidates, intentContext);
  const rankingTime = Date.now() - rankingStart;

  // 5. Guardrails & Filters
  const { safeCandidates } = enforceGuardrails(ranked);
  const diverseCandidates = applyDiversityFilter(safeCandidates);

  // 6. Discovery Engine (Splits into recommended, explore, hiddenGems)
  const discoveryMix = generateExplorationMix(diverseCandidates);

  // 7. Bundle Engine (Mocking cart items with recent signals if available)
  let ctl = [];
  let fbt = [];
  if (intentDoc && intentDoc.signals && intentDoc.signals.clickSignals.length > 0) {
    const signalIds = intentDoc.signals.clickSignals.map(s => s.toString());
    ctl = await generateCompleteLook(intentContext, signalIds);
    fbt = await generateFrequentlyBought(signalIds);
  }

  // Combine components for Feed Builder
  const finalCandidates = {
    recommended: discoveryMix.recommended,
    explore: discoveryMix.explore,
    newArrivals: newArrivals,
    trending: trendingCandidates, // Usually trending is displayed as its own static section
    completeLook: ctl,
    frequentlyBought: fbt
  };

  const latency = Date.now() - startTime;
  const finalCount = discoveryMix.recommended.length + discoveryMix.explore.length + newArrivals.length + trendingCandidates.length;

  const metrics = {
    latency,
    retrievalTime,
    rankingTime,
    cacheHit: false,
    candidateCount,
    finalCount
  };

  // 8. Feed Builder
  const sections = buildFeedSections(intentContext, finalCandidates);

  return formatFinalResponse(intentDoc, sections, metrics);
};
