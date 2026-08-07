<div align="center">
  <img src="https://raw.githubusercontent.com/lucide-icons/lucide/main/icons/shopping-bag.svg" width="80" alt="Discover Engine Logo">
  
  # Discover Engine
  **AI-Powered Personalized Multi-Intent Product Discovery Platform**
  
  <p>
    An enterprise-grade shopping experience that proves AI doesn't have to look like a chatbot. Discover Engine delivers semantic search, real-time intent extraction, and policy-driven guardrails—all wrapped in a stunning, Apple-level UI.
  </p>
</div>

---

## 🌟 The Vision

Most AI implementations in e-commerce look like hacker tools or chatbots slapped onto a website. **Discover Engine** takes a different approach. We believe AI should be invisible, deterministic, and deeply embedded into the native shopping flow. 

Discover Engine replaces standard keyword search and static home pages with **semantic vector retrieval** and **live strategy orchestrators**, guaranteeing highly relevant, personalized product feeds.

## ✨ Key Features

- **Semantic Vector Search:** Forget keyword matching. Type *"Shoes for a rainy marathon"* and watch the AI fetch the exact right gear.
- **Dynamic Intent Extraction:** The `Orchestrator` determines user intent on-the-fly (e.g., *Fitness Journey* vs *Casual Browsing*) and ranks the home feed accordingly.
- **Enterprise Guardrails (DPDP):** A built-in policy validation layer ensures brand safety, removes duplicates, and guarantees a diverse product mix (max 35% concentration per brand).
- **Explainable AI:** "Why was this recommended?" Users can see a beautiful, subtle badge explaining exactly why the AI chose a specific product for them.
- **Premium Apple-Level UI:** Built with React, TailwindCSS, and Framer Motion for buttery smooth page transitions, micro-interactions, and a native app feel.

## 🏗️ Architecture Stack

### Backend (The Brain)
- **Node.js & Express:** High-performance async API server.
- **In-Memory MongoDB:** Automatic database mocking and seeding via `mongodb-memory-server` (Zero-setup required!).
- **AI Router & Retrieval Engine:** Multi-tower vector search architecture (mocked/hybridized for demo speed).

### Frontend (The Face)
- **Vite & React 19:** Ultra-fast bundling and rendering.
- **TailwindCSS 4:** Utility-first, highly scalable design system.
- **Lucide Icons & Framer Motion:** For stunning micro-animations and aesthetic completeness.

---

## 🚀 How to Run the Demo Locally

We've built this project to be **zero-friction**. You do not need to install databases or configure API keys to run the MVP. 

### 1. Start the Backend (API & AI Engine)
Open a terminal and navigate to the project root:
```bash
cd "discover engine"
npm install
npm run dev
```
> **Note:** On first boot, it will take ~10-20 seconds to download the MongoDB Memory Server binaries and seed the database. Wait until you see `MongoDB Connected` and `Seeded X products` in the console.

### 2. Start the Frontend (UI)
Open a *second* terminal and navigate to the frontend folder:
```bash
cd "discover engine/frontend"
npm install
npm run dev
```

### 3. Experience the Demo
Open your browser and navigate to: **`http://localhost:5173/`**

**The Golden Demo Flow:**
1. Click **Demo Login** on the landing page.
2. Observe the AI-generated **Home Feed** (Notice the "Current Context" AI insight card).
3. Type *"Running Shoes"* into the top search bar and hit Enter.
4. Click on any product card in the search results to view the **Product Details Page**.
5. Click **Add to Cart**. 

---

## 🧠 Behind the Scenes: The AI Pipeline

If you were to open the **Admin Dashboard** (`#admin`), you would see the live trace of how our AI generates a feed:

1. **Session & Intent:** `req_8f72c91b4a` -> Extracts "Fitness Journey"
2. **Retrieval Engine:** Scans vectors and rules to fetch 142 raw candidates.
3. **Guardrails Engine:** Validates data policy. Removes 3 duplicates. Ensures diversity.
4. **Feed Builder:** Condenses the final 24 items into highly curated categories (*Recommended, Explore More, Fresh Drops*).

---

## 🛠️ What We Built (Hackathon MVP Scope)

In this hackathon, we focused on building a compelling end-to-end prototype. To ensure a flawless, zero-latency demo without relying on paid APIs, we implemented a hybrid of fully functional systems and "Wizard of Oz" mocked components. Here is the *true* breakdown of our MVP:

### 🟢 Fully Functional (Live in MVP)
- **Backend Architecture:** A robust Express.js modular backend built to handle AI workflows.
- **Zero-Config Database:** We implemented `mongodb-memory-server` and a `seed.js` script. The moment the backend boots, it creates a real, queryable MongoDB database in-memory and populates it with realistic products.
- **Search Engine:** The `POST /api/v1/search` endpoint actively queries the in-memory MongoDB using regex/text search to return real products from the database based on user input.
- **Dynamic UI Rendering:** The Frontend (React/Tailwind) actively consumes the Express APIs. The Home Page and Search Results dynamically render the products sent by the backend.
- **Native App Feel:** The UI is fully polished with Framer Motion transitions, responsive layouts, and interconnected routing (Login -> Home -> Search -> Product Details).

### 🟡 Mocked for Demo (The "Wizard of Oz")
- **Vector/Semantic Retrieval:** Instead of calling a real embedding model (which adds latency and requires API keys), the AI Orchestrator gracefully falls back to our functional MongoDB text search while returning the data structure expected by the semantic engine.
- **AI Intent & Guardrails:** The logic for Intent Extraction, Guardrails (DPDP), and Diversity Filtering is structurally built in the backend, but currently returns mocked responses to guarantee a perfect narrative during the 5-minute pitch.
- **Admin Dashboard:** The Live Execution Trace and KPI metrics on the Admin Dashboard are visually hardcoded. They accurately represent *how* the data structure looks when the orchestrator runs, but they do not reflect live telemetry.

This hybrid approach allowed us to deliver a visually stunning, clickable MVP that tells the complete story of the Discover Engine, while maintaining a perfectly stable, offline-capable demo environment.

---

<div align="center">
  <i>Built with ❤️ for the Hackathon</i>
</div>
