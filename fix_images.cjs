const mongoose = require('mongoose');

const IMAGES = [
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
  "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
  "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
  "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
  "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&q=80",
  "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80",
  "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80",
  "https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&q=80",
  "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&q=80",
  "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=800&q=80",
  "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&q=80",
  "https://images.unsplash.com/photo-1588099768523-f4e6a5679d88?w=800&q=80",
  "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=800&q=80",
  "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=800&q=80",
  "https://images.unsplash.com/photo-1529810313688-44ea1c2d81d3?w=800&q=80"
];

async function run() {
  await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net');
  const collection = mongoose.connection.collection('products');
  const products = await collection.find().toArray();
  
  for (let p of products) {
    const randomImage = IMAGES[Math.floor(Math.random() * IMAGES.length)];
    await collection.updateOne({_id: p._id}, { $set: { images: [randomImage] }});
  }
  
  console.log('Images Updated');
  process.exit(0);
}
run();
