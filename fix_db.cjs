const mongoose = require('mongoose');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-2" });

const generateEmbed = async (title, description, tags) => {
  const text = `${title} ${description} ${tags.join(' ')}`;
  const res = await embeddingModel.embedContent(text);
  return res.embedding.values;
};

async function run() {
  await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net/discover-engine?retryWrites=true&w=majority');
  
  const Product = require('./src/models/Product.model.js').default;

  // 1. Black Shirt
  let emb1 = await generateEmbed('Premium Zenith Black T-Shirt', 'High quality black t-shirt for maximum performance. Built with cotton.', ['shirt', 'black', 'tee', 'apparel', 'cotton']);
  await Product.updateOne({title: 'Premium Zenith Plate'}, { 
    $set: { 
      title: 'Premium Zenith Black T-Shirt', 
      description: 'High quality black t-shirt for maximum performance. Built with cotton.', 
      category: 'Apparel', 
      tags: ['shirt', 'black', 'tee', 'apparel', 'cotton'],
      embedding: emb1
    } 
  });

  // 2. Another black shirt (the first image on the second row)
  let emb2 = await generateEmbed('Classic Essential Black Tee', 'Minimalist black tee for everyday wear.', ['shirt', 'black', 'tee', 'apparel', 'classic']);
  await Product.updateOne({title: 'Sleek Trek Tee'}, { 
    $set: { 
      title: 'Classic Essential Black Tee', 
      description: 'Minimalist black tee for everyday wear.', 
      category: 'Apparel', 
      tags: ['shirt', 'black', 'tee', 'apparel', 'classic'],
      embedding: emb2
    } 
  });

  // 3. Green Pants
  let emb3 = await generateEmbed('Aero Apex Green Pants', 'Comfortable green pants for outdoor activities.', ['pants', 'green', 'clothing', 'outdoor', 'apparel']);
  await Product.updateOne({title: 'Aero Apex Pants'}, {
    $set: {
      title: 'Aero Apex Green Pants',
      description: 'Comfortable green pants for outdoor activities.',
      category: 'Apparel',
      tags: ['pants', 'green', 'clothing', 'outdoor', 'apparel'],
      embedding: emb3
    }
  });

  // 4. Blue Pants
  let emb4 = await generateEmbed('Ultra Stride Blue Sweatpants', 'Comfortable blue sweatpants for relaxing or working out.', ['pants', 'blue', 'clothing', 'sweatpants', 'apparel']);
  await Product.updateOne({title: 'Ultra Stride Cream'}, {
    $set: {
      title: 'Ultra Stride Blue Sweatpants',
      description: 'Comfortable blue sweatpants for relaxing or working out.',
      category: 'Apparel',
      tags: ['pants', 'blue', 'clothing', 'sweatpants', 'apparel'],
      embedding: emb4
    }
  });

  // 5. Red Shoes
  let emb5 = await generateEmbed('Premium Trek Red Runners', 'High performance red running shoes.', ['shoes', 'red', 'running', 'sneakers', 'footwear']);
  await Product.updateOne({title: 'Premium Trek Runner'}, {
    $set: {
      title: 'Premium Trek Red Runners',
      description: 'High performance red running shoes.',
      category: 'Running Shoes',
      tags: ['shoes', 'red', 'running', 'sneakers', 'footwear'],
      embedding: emb5
    }
  });

  // 6. Green Boots
  let emb6 = await generateEmbed('Vintage Green Combat Boots', 'Durable green combat boots for hiking and outdoor trails.', ['boots', 'green', 'shoes', 'hiking', 'outdoor']);
  await Product.updateOne({title: 'Vintage Apex Kicks'}, {
    $set: {
      title: 'Vintage Green Combat Boots',
      description: 'Durable green combat boots for hiking and outdoor trails.',
      category: 'Shoes',
      tags: ['boots', 'green', 'shoes', 'hiking', 'outdoor'],
      embedding: emb6
    }
  });

  // 7. Red Nike Shoes
  let emb7 = await generateEmbed('Nike Red Zoom Fly', 'High performance red nike running shoes.', ['shoes', 'red', 'nike', 'running', 'sneakers']);
  await Product.updateOne({title: 'Essential Nova Vest'}, { // Replace some random item with the red nike shoes
    $set: {
      title: 'Nike Red Zoom Fly',
      description: 'High performance red nike running shoes.',
      category: 'Running Shoes',
      tags: ['shoes', 'red', 'nike', 'running', 'sneakers'],
      embedding: emb7
    }
  });

  // 8. White Shoes
  let emb8 = await generateEmbed('Minimalist White Sneakers', 'Clean white sneakers for everyday use.', ['shoes', 'white', 'sneakers', 'footwear', 'minimalist']);
  await Product.updateOne({title: 'Smart Trek Trail Shoes'}, { // Replace some random item with the white shoes
    $set: {
      title: 'Minimalist White Sneakers',
      description: 'Clean white sneakers for everyday use.',
      category: 'Shoes',
      tags: ['shoes', 'white', 'sneakers', 'footwear', 'minimalist'],
      embedding: emb8
    }
  });

  console.log('Fixed DB items and re-embedded them!');
  process.exit(0);
}

run().catch(console.error);
