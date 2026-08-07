# Discover Engine

> AI-Powered Personalized Multi-Intent Product Discovery Platform

Discover Engine is an intelligent recommendation and product discovery platform designed to improve the shopping experience by understanding a user's real-time shopping intent instead of relying only on historical purchases.

The system combines session behavior, semantic search, product relationships, and explainable recommendations to generate a personalized discovery experience for every user.

---

# Problem Statement

Traditional recommendation systems primarily depend on historical purchase data, making it difficult to understand what a customer is interested in during the current shopping session.

Some common challenges include:

- Cold-start recommendations for new users
- Poor semantic understanding of search queries
- Repetitive recommendations
- Lack of explainability
- Limited product discovery

Discover Engine addresses these challenges using a hybrid recommendation pipeline that focuses on current user intent.

---

# Features

## 1. Intent Intelligence

Analyzes user interactions such as:

- Product views
- Search history
- Cart activity
- Wishlist
- Session behavior

to identify the customer's current shopping intent.

Example

```
Running Shoes
↓

Protein Powder
↓

Gym Bottle

↓

Fitness Journey
```

---

## 2. Personalized Discovery Feed

Instead of showing the same homepage to everyone, Discover Engine generates a personalized feed containing

- Recommended For You
- Trending Products
- Complete The Look
- Frequently Bought Together
- Explore More
- New Arrivals

based on the customer's current shopping session.

---

## 3. Semantic Product Search

Search works beyond exact keyword matching.

Example

```
Gaming setup
```

returns

- Gaming Monitor
- Mechanical Keyboard
- Gaming Chair
- RGB Mouse
- Headset

instead of only products containing the word "gaming".

---

## 4. Explainable Recommendations

Every recommendation includes a reason explaining why it appears.

Example

```
Why was this recommended?

• You searched for Running Shoes

• You viewed Sports Accessories

• Your current shopping intent is Fitness Journey
```

This improves transparency and user trust.

---

## 5. Enterprise Guardrails

Recommendation quality is maintained using rule-based validation.

Current guardrails include

- Duplicate removal
- Category diversity
- Product availability validation
- Recommendation validation
- Explainability checks

---

## 6. Admin Analytics Dashboard

An admin dashboard provides insights into system performance.

Available metrics include

- Recommendation latency
- Feed quality
- Recommendation workflow
- AI decision trace
- Business KPIs
- Recommendation analytics

---

# Project Architecture

```
User Session
      │
      ▼
Intent Intelligence Engine
      │
      ▼
Recommendation Strategy
      │
      ▼
Candidate Retrieval
      │
      ▼
Recommendation Ranking
      │
      ▼
Guardrails
      │
      ▼
Explainability
      │
      ▼
Personalized Discovery Feed
```

---

# Tech Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication

## AI Components

- Hybrid Intent Detection
- Semantic Search
- Explainability Engine
- Recommendation Pipeline

---

# Project Structure

```
frontend/
backend/

backend/src

controllers/

routes/

services/

models/

middleware/

ai/

utils/

config/
```

---

# Getting Started

## Backend

```bash
cd backend
npm install
npm run dev
```

---

## Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GEMINI_API_KEY=your_api_key
```

---

# Demo Flow

1. Login using the demo account.
2. Search for **Running Shoes**.
3. View multiple sports products.
4. Add **Protein Powder** to the cart.
5. Observe the updated shopping intent.
6. Return to the home page.
7. View personalized recommendations.
8. Open a product.
9. Check **Complete The Look**.
10. View **Frequently Bought Together**.
11. Click **Why Recommended**.
12. Open the Admin Dashboard to view the AI workflow and recommendation analytics.

---

# Future Enhancements

- Multimodal embeddings
- Real-time vector search
- Personalized ranking models
- Continuous learning from user behavior
- Voice and image search
- Recommendation feedback loop

---

# Team

Developed during a hackathon to demonstrate how modern recommendation systems can combine AI, explainability, and real-time personalization to improve product discovery.

---

# License

This project is created for educational and hackathon purposes.