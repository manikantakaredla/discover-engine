import { searchFaissMock } from './faissProvider.js';
import { searchMilvusMock } from './milvusProvider.js';
import { providerConfig } from '../config/provider.config.js';

export const queryVectorStore = async (queryVector) => {
  if (providerConfig.activeVectorStore === 'FAISS') {
    return await searchFaissMock(queryVector);
  } else if (providerConfig.activeVectorStore === 'MILVUS') {
    return await searchMilvusMock(queryVector);
  }
  
  throw new Error(`Unsupported Vector Store: ${providerConfig.activeVectorStore}`);
};
