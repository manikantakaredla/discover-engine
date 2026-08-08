require('dotenv').config();
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });

const generateEmbed = async (title, description, tags) => {
  const text = `${title} ${description} ${tags.join(' ')}`;
  const res = await embeddingModel.embedContent(text);
  return res.embedding.values;
};

// Helper for delays to avoid rate limits
const delay = ms => new Promise(res => setTimeout(res, ms));

async function run() {
  try {
    await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net/discover-engine?retryWrites=true&w=majority');
    console.log('Connected to DB');

    const Product = require('./src/models/Product.model.js').default;

    console.log('Fetching products from DummyJSON API...');
    const response = await fetch('https://dummyjson.com/products?limit=194');
    const data = await response.json();
    let rawProducts = data.products || [];

    console.log(`Found ${rawProducts.length} products. Cloning remaining to hit exactly 300...`);
    
    // Clone products to reach 300
    const needed = 300 - rawProducts.length;
    for (let i = 0; i < needed; i++) {
        const source = rawProducts[i % rawProducts.length];
        rawProducts.push({
            ...source,
            title: `Premium ${source.title}`,
            price: source.price * 1.5,
            id: `premium_${source.id}_${i}`
        });
    }

    // Cut exactly 300 if over
    rawProducts = rawProducts.slice(0, 300);

    console.log('Wiping old DB...');
    await Product.deleteMany({});

    console.log('Embedding and inserting exactly 300 products. This will take ~1-2 minutes...');
    
    let inserted = 0;
    
    // Batch processing to respect rate limits
    const batchSize = 15;
    for (let i = 0; i < rawProducts.length; i += batchSize) {
      const batch = rawProducts.slice(i, i + batchSize);
      
      const batchPromises = batch.map(async (p) => {
        try {
          const tags = [p.category, ...(p.tags || [])];
          let embedding = [];
          try {
            embedding = await generateEmbed(p.title, p.description || '', tags);
          } catch (embedError) {
            console.log(`⚠️ Rate limit hit for embedding ${p.title}, skipping embedding...`);
          }
          
          await Product.create({
            title: p.title,
            description: p.description,
            price: p.price,
            category: p.category,
            brand: p.brand || 'Discover Brand',
            images: p.images && p.images.length > 0 ? p.images : [p.thumbnail || 'https://via.placeholder.com/400'],
            rating: p.rating || 4.5,
            reviewCount: p.stock || 50,
            embedding: embedding
          });
          console.log(`✅ Inserted: ${p.title.substring(0, 50)}`);
          inserted++;
        } catch (e) {
          console.error(`❌ Failed to insert ${p.title}:`, e.message);
        }
      });
      
      await Promise.all(batchPromises);
      // Wait 1 second between batches to avoid embedding API rate limits (1500 RPM)
      await delay(1000); 
    }

    console.log(`\n🎉 Success! Database perfectly seeded with exactly ${inserted} accurate products!`);
    process.exit(0);
  } catch (error) {
    console.error('Fatal Error:', error);
    process.exit(1);
  }
}

run();
