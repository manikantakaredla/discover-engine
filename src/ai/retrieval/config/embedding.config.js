export const embeddingConfig = {
  // Embedding model dimensions (e.g. 768 for BERT, 1536 for OpenAI)
  textDimension: 768,
  imageDimension: 512,
  multimodalDimension: 1280, // Concatenated or projected dimension
  
  // Model versioning
  modelVersion: 'v1.0',
  
  // Normalization
  normalizeEmbeddings: true
};
