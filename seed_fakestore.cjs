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

async function run() {
  try {
    await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net/discover-engine?retryWrites=true&w=majority');
    console.log('Connected to DB');

    const Product = require('./src/models/Product.model.js').default;

    console.log('Fetching products from FakeStoreAPI...');
    const response = await fetch('https://fakestoreapi.com/products');
    const fakeProducts = await response.json();

    console.log(`Found ${fakeProducts.length} products. Wiping old DB...`);
    await Product.deleteMany({});

    console.log('Embedding and inserting new products...');
    
    // We will do these sequentially since gemini-embedding-2 has high limits, but just to be safe
    for (let i = 0; i < fakeProducts.length; i++) {
      const fp = fakeProducts[i];
      
      const tags = [fp.category.replace(/[^a-zA-Z0-9]/g, ''), 'fakestore', 'product'];
      if (fp.title.toLowerCase().includes('shirt')) tags.push('shirt', 'apparel');
      if (fp.title.toLowerCase().includes('jacket')) tags.push('jacket', 'outerwear');
      if (fp.title.toLowerCase().includes('gold')) tags.push('gold', 'jewelry');
      if (fp.title.toLowerCase().includes('drive')) tags.push('electronics', 'storage');
      
      const embedding = await generateEmbed(fp.title, fp.description, tags);

      await Product.create({
        title: fp.title,
        brand: 'FakeStore',
        description: fp.description,
        category: fp.category.charAt(0).toUpperCase() + fp.category.slice(1),
        price: fp.price * 80, // Convert to roughly INR for realism
        stock: 50,
        images: [fp.image],
        tags: tags,
        attributes: {
          style: 'Standard',
          material: 'Mixed'
        },
        rating: fp.rating.rate,
        reviewCount: fp.rating.count,
        embedding: embedding
      });

      console.log(`✅ Inserted: ${fp.title}`);
    }

    console.log('Database perfectly seeded with accurate matching products!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

run();
