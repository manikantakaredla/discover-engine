import { generateTextEmbedding } from '../embedding/textEmbedding.js';

export const generateUserEmbedding = async (intentDoc, sessionDoc) => {
  // A true Two-Tower architecture user tower encodes all user context into one vector
  let contextString = '';

  if (intentDoc && intentDoc.primaryIntent) {
    contextString += `${intentDoc.primaryIntent.name} `;
    if (intentDoc.intentContext) {
      contextString += `${intentDoc.intentContext.dominantCategory || ''} ${intentDoc.intentContext.dominantBrand || ''} `;
    }
  }

  // Add recent history/clicks
  // (In a real system this would be a deep neural net, here we summarize text for the text embedding stub)
  
  if (!contextString.trim()) contextString = 'general shopping';

  return await generateTextEmbedding(contextString);
};
