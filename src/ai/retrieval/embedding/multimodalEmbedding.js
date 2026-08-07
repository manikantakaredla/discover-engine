import { generateTextEmbedding } from './textEmbedding.js';
import { generateImageEmbedding } from './imageEmbedding.js';

export const generateMultimodalEmbedding = async (text, imageUrl) => {
  // In a real system, you might project both into a shared latent space (like CLIP)
  // Or concatenate them. Here we mock concatenation.
  const textVec = await generateTextEmbedding(text);
  const imageVec = await generateImageEmbedding(imageUrl);
  
  return [...textVec, ...imageVec];
};
