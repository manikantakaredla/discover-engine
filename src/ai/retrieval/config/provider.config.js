export const providerConfig = {
  // Current active providers
  activeEmbeddingProvider: 'SENTENCE_TRANSFORMERS', // Future: 'GEMINI', 'OPENAI'
  activeVectorStore: 'FAISS', // Future: 'MILVUS', 'PINECONE'
  
  // Connection details (in production these would be in .env)
  milvusUrl: process.env.MILVUS_URL || 'localhost:19530',
  pineconeApiKey: process.env.PINECONE_API_KEY || ''
};
