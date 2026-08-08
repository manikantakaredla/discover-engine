require('dotenv').config();
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Need to load from process.env because this runs outside the main app
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });

async function run() {
  await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net/discover-engine?retryWrites=true&w=majority');
  const collection = mongoose.connection.collection('products');
  const products = await collection.find().toArray();
  
  console.log(`Found ${products.length} products. Generating embeddings...`);

  let count = 0;
  for (let p of products) {
    const textToEmbed = `${p.title} ${p.brand} ${p.category} ${p.description} ${(p.tags || []).join(' ')} ${p.attributes?.color || ''}`;
    
    try {
      const result = await embeddingModel.embedContent(textToEmbed);
      const embedding = result.embedding.values;
      
      await collection.updateOne({_id: p._id}, { $set: { embedding: embedding }});
      count++;
      if (count % 10 === 0) console.log(`Processed ${count}/${products.length}...`);
      
      // small delay to avoid rate limits
      await new Promise(res => setTimeout(res, 200));
    } catch (err) {
      console.error(`Failed to embed product ${p._id}:`, err.message);
    }
  }
  
  console.log('Embeddings Updated successfully!');
  process.exit(0);
}

run();
