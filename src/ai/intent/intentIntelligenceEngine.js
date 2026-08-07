import { extractSignals } from './core/signalExtractor.js';
import { generateEvidence } from './core/evidenceEngine.js';
import { calculateScores } from './core/scoringEngine.js';
import { calculateConfidence } from './core/confidenceEngine.js';
import { buildContext } from './core/contextEngine.js';
import { calculateHeat } from './core/heatEngine.js';
import { determineState } from './core/stateEngine.js';
import { buildTimeline } from './core/timelineEngine.js';
import { calculateTransition } from './core/transitionEngine.js';
import { fetchMemory } from './core/memoryEngine.js';
import { intentConfig } from '../../config/intent.config.js';

export const detectIntent = async (sessionId) => {
  // 1. Memory Engine
  const intentDoc = await fetchMemory(sessionId);

  // 2. Signal Extractor
  const signals = await extractSignals(sessionId);
  if (signals.totalCount === 0) return intentDoc; // No signals to process

  // 3. Evidence Engine (with Decay & Rule implicitly called inside)
  const evidenceList = generateEvidence(signals);

  // 4. Scoring Engine
  const sortedScores = calculateScores(evidenceList);

  // 5. Confidence Engine
  const { intents, breakdown } = calculateConfidence(sortedScores, evidenceList);
  
  const previousPrimaryName = intentDoc.primaryIntent.name;
  const previousPrimaryConfidence = intentDoc.primaryIntent.confidence;

  const currentPrimary = intents.length > 0 ? intents[0] : { name: 'Unknown', confidence: 0 };
  const currentSecondary = intents.slice(1, intentConfig.maxSecondaryIntents + 1);

  // 6. Transition Engine
  const transition = calculateTransition(previousPrimaryName, previousPrimaryConfidence, currentPrimary.name, currentPrimary.confidence, evidenceList);

  // 7. Context Engine
  const context = buildContext(evidenceList, signals);

  // 8. Heat Engine
  const heat = calculateHeat(signals.totalCount, intentDoc.createdAt);

  // 9. State Engine
  const state = determineState(currentPrimary.confidence, signals.totalCount);

  // 10. Timeline Engine
  const timeline = buildTimeline(intentDoc.intentTimeline, currentPrimary.name, currentPrimary.confidence, transition ? transition.transitionReason.join(', ') : 'Activity updated');

  // Intent Health (mocked for simplicity, could be complex in ML)
  const health = {
    stability: currentPrimary.confidence > 50 ? 90 : 40,
    volatility: transition ? 60 : 10,
    consistency: 100 - (transition ? 50 : 0)
  };

  // Update Document
  intentDoc.primaryIntent = currentPrimary;
  intentDoc.secondaryIntents = currentSecondary;
  intentDoc.intentEvidence = evidenceList;
  intentDoc.intentTimeline = timeline;
  intentDoc.intentContext = context;
  intentDoc.confidenceBreakdown = breakdown;
  intentDoc.intentHealth = health;
  intentDoc.signals = {
    clickSignals: signals.clickSignals.map(s => s._id),
    searchSignals: signals.searchSignals.map(s => s._id),
    wishlistSignals: signals.wishlistSignals.map(s => s._id),
    cartSignals: signals.cartSignals.map(s => s._id),
    purchaseSignals: signals.purchaseSignals.map(s => s._id),
  };
  if (transition) intentDoc.transition = transition;
  intentDoc.engagementScore = heat.engagementScore;
  intentDoc.status = state;

  await intentDoc.save();
  return intentDoc;
};
