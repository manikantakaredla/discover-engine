import { GoogleGenerativeAI } from '@google/generative-ai';
import { env } from '../config/env.js';
import { logger } from '../config/logger.js';

let genAI;
let model;
let embeddingModel;

if (env.geminiApiKey) {
  genAI = new GoogleGenerativeAI(env.geminiApiKey);
  // Specify the model required by the prompt
  model = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
  embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });
} else {
  logger.warn('GEMINI_API_KEY is not set in environment variables.');
}

/**
 * Generates a vector embedding for a given text.
 * @param {string} text The text to embed.
 * @returns {Promise<number[]>} The embedding vector.
 */
export const generateEmbedding = async (text) => {
  if (!embeddingModel) {
    throw new Error('Gemini embedding model is not initialized (API key missing).');
  }
  try {
    const result = await embeddingModel.embedContent(text);
    return result.embedding.values;
  } catch (error) {
    logger.error('Error generating embedding:', error);
    return [];
  }
};

/**
 * Extracts semantic understanding from a user query using Gemini.
 * @param {string} query The user's search query.
 * @returns {Promise<Object>} JSON containing extracted metadata.
 */
export const extractSearchIntent = async (query) => {
  if (!model) {
    throw new Error('Gemini model is not initialized (API key missing).');
  }

  const prompt = `
    You are an AI assistant for an e-commerce Discover Engine.
    Your task is to extract semantic understanding from the user's shopping query.
    Return ONLY a valid JSON object matching the following structure.
    Do not include markdown blocks like \`\`\`json.
    
    Structure:
    {
      "query": "original query or normalized version",
      "category": "Broad category (e.g., Sports, Apparel, Accessories, Electronics)",
      "brands": ["Array of any specific brands mentioned, or empty array"],
      "tags": ["Array of descriptive tags extracted from the query, e.g., 'Running', 'Fitness', 'Waterproof'"],
      "priceRange": "Low, Medium, High, or Any based on intent (e.g., 'cheap' -> Low, 'premium' -> High. Default to Any)"
    }

    User Query: "${query}"
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text().trim();
    
    // Clean up potential markdown formatting from Gemini's response
    if (text.startsWith('\`\`\`json')) {
      text = text.substring(7);
    }
    if (text.startsWith('\`\`\`')) {
      text = text.substring(3);
    }
    if (text.endsWith('\`\`\`')) {
      text = text.substring(0, text.length - 3);
    }

    return JSON.parse(text);
  } catch (error) {
    logger.error('Error generating semantic understanding from Gemini:', error);
    // Fallback if parsing or generation fails
    return {
      query: query,
      category: "Any",
      brands: [],
      tags: [],
      priceRange: "Any"
    };
  }
};
