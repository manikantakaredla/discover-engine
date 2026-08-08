# Discover Engine 🚀

Discover Engine is a next-generation, AI-powered e-commerce search and recommendation platform built for the ultimate hackathon demonstration. It replaces traditional keyword search with deep semantic understanding, intent detection, and personalized real-time feeds.

## 🌟 Project Overview
Traditional e-commerce platforms force users to speak "computer" (e.g., "shoes running black size 10"). Discover Engine allows users to speak human (e.g., "I need something comfortable for my marathon training"). Our two-tower semantic architecture understands the *intent* behind the query, retrieves vector-embedded products, applies real-time business guardrails, and renders a dynamic, highly personalized feed.

## 🏗 Architecture
- **Frontend:** React, Vite, TailwindCSS, Lucide Icons (Premium UI)
- **Backend:** Node.js, Express, MongoDB (Mongoose)
- **AI Core:** Google Gemini 3.6 Flash (Intent Detection & Guardrails), Gemini Embedding 2 (Vector Embeddings)
- **Vector Search:** MongoDB Atlas Vector Search (Cosine Similarity)

## ✨ Features
- **Semantic Search:** Finds products based on meaning, not just exact keyword matches.
- **Intent Extraction:** Automatically determines price range, target audience, and category from raw text.
- **Explainable AI:** Transparent UI showing *why* a product was recommended.
- **Real-time KPI Dashboard:** Admin view showing execution trace, system latency, cache hits, and CTR metrics.
- **Event Tracking Pipeline:** Tracks page views, searches, and recommendation clicks asynchronously.

## 🚀 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-repo/discover-engine.git
   cd discover-engine
   ```

2. **Backend Setup:**
   ```bash
   npm install
   npm run dev
   ```

3. **Frontend Setup:**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

4. **Seed the Database:**
   ```bash
   node seed_fakestore.cjs
   ```

## 🔐 Environment Variables
Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.mongodb.net/discover-engine
GEMINI_API_KEY=your_gemini_api_key
```

## 🎥 Demo Flow (Golden Path)
1. **Home Page:** User lands on the beautifully curated catalog.
2. **Semantic Search:** User searches "running shoes" or "black bag".
3. **Intent Detection:** Gemini extracts the underlying intent (e.g., Fitness Journey).
4. **Vector Retrieval:** Backend performs cosine similarity search against the DB.
5. **Explainability:** User clicks a product and sees exactly *why* it matched their intent.
6. **Admin Dashboard:** Hackathon judges view the live `Execution Trace`, pipeline latency, and KPI metrics.

## 🔮 Future Scope
- **Personalized Collaborative Filtering (NCF):** Combining semantic search with historical user behavior.
- **Multi-modal Search:** Allowing users to upload images to search by vision.
- **Dynamic Pricing:** Real-time price adjustments based on inventory and demand.
- **Voice Commerce:** Voice-activated semantic search integration.

---
*Built with ❤️ for the Hackathon.*