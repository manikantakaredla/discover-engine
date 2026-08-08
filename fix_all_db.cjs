require('dotenv').config();
const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const visionModel = genAI.getGenerativeModel({ model: "gemini-3.6-flash" });
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });

const generateEmbed = async (title, description, tags) => {
  const text = `${title} ${description} ${tags.join(' ')}`;
  const res = await embeddingModel.embedContent(text);
  return res.embedding.values;
};

const delay = ms => new Promise(r => setTimeout(r, ms));

async function processProduct(product) {
  try {
    const imageUrl = product.images[0];
    if (!imageUrl) return;

    // Fetch the image
    const response = await fetch(imageUrl);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const mimeType = response.headers.get('content-type') || 'image/jpeg';

    const prompt = `You are a product catalog expert. Look at this product image and generate a JSON object with the following fields:
    - "title": A catchy, accurate e-commerce title for the item.
    - "description": A short, realistic description of the item.
    - "category": Choose one of: [Apparel, Shoes, Electronics, Home, Beauty, Accessories]
    - "tags": An array of 5-8 descriptive tags (e.g. ["shirt", "black", "casual"]). Include color and item type as tags.
    - "attributes": An object with "color", "style", and "material" strings.
    
    Output ONLY valid JSON. Do not include markdown formatting like \`\`\`json.`;

    const imageParts = [
      {
        inlineData: {
          data: buffer.toString("base64"),
          mimeType
        }
      }
    ];

    const result = await visionModel.generateContent([prompt, ...imageParts]);
    const responseText = result.response.text().replace(/```json/g, '').replace(/```/g, '').trim();
    
    const parsedData = JSON.parse(responseText);
    
    // Compute embedding for the new textual representation
    const newEmbedding = await generateEmbed(parsedData.title, parsedData.description, parsedData.tags);

    await product.updateOne({
      $set: {
        title: parsedData.title,
        description: parsedData.description,
        category: parsedData.category,
        tags: parsedData.tags,
        attributes: parsedData.attributes,
        embedding: newEmbedding
      }
    });

    console.log(`✅ Updated: [${product._id}] -> ${parsedData.title}`);
  } catch (error) {
    console.error(`❌ Failed to update product ${product._id}:`, error.message);
  }
}

async function run() {
  await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net/discover-engine?retryWrites=true&w=majority');
  console.log('Connected to DB');

  const Product = require('./src/models/Product.model.js').default;
  const products = await Product.find({}).lean(); // Wait, we need model instances to update? No, we can use Product.updateOne
  
  console.log(`Found ${products.length} products to process. This will take a few minutes...`);

  // Process sequentially to respect the 15 RPM free tier limit
  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    
    // We will use Product model directly to update, so pass _id and images
    const productObj = {
      _id: p._id,
      images: p.images,
      updateOne: async (query) => {
         await Product.updateOne({ _id: p._id }, query);
      }
    };
    await processProduct(productObj);
    
    console.log(`Processed ${i + 1} of ${products.length}`);
    await delay(4500); // 4.5 seconds delay keeps us safely under 15 requests per minute
  }

  console.log('All products fixed successfully!');
  process.exit(0);
}

run().catch(console.error);
