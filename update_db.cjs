const mongoose = require('mongoose');

async function run() {
  await mongoose.connect('mongodb+srv://luckyha0637k_db_user:afsmgblBXVCwr9s2@cluster0.32waqvz.mongodb.net');
  const collection = mongoose.connection.collection('products');
  const products = await collection.find().toArray();
  
  for (let p of products) {
    const newPrice = Math.floor(p.price * 80);
    const keyword = encodeURIComponent(p.category || 'shoes');
    const randomImage = `https://source.unsplash.com/800x800/?${keyword}&sig=${Math.random()}`;
    await collection.updateOne({_id: p._id}, { $set: { price: newPrice, images: [randomImage] }});
  }
  
  console.log('DB Updated');
  process.exit(0);
}
run();
