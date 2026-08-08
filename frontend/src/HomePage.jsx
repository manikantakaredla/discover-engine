import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Menu, 
  ChevronRight, Star, Plus, Target, Sparkles, X
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Dummy Data ---
const DUMMY_PRODUCTS = [
  { id: 1, name: "Ultra-Light Workout Tee", brand: "Velocity", price: 45.00, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { id: 2, name: "Pro Compression Tights", brand: "Aura", price: 89.00, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80" },
  { id: 3, name: "Cloud-Step Running Shoes", brand: "Stride", price: 145.00, rating: 4.7, reviews: 312, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80" },
  { id: 4, name: "Hydration Flask 32oz", brand: "Aqua", price: 35.00, rating: 4.6, reviews: 56, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80" },
  { id: 5, name: "Resistance Band Set", brand: "Flex", price: 24.00, rating: 4.8, reviews: 432, image: "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=500&q=80" },
  { id: 6, name: "Smart Fitness Watch", brand: "Pulse", price: 199.00, rating: 4.9, reviews: 892, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" }
];

// --- Components ---

const IconButton = ({ icon: Icon, badge, className }) => (
  <button className={cn("relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700", className)}>
    <Icon className="w-5 h-5" strokeWidth={2} />
    {badge && (
      <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white">
        {badge}
      </span>
    )}
  </button>
);

const ProductCard = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group flex flex-col min-w-[220px] max-w-[220px] sm:min-w-[260px] sm:max-w-[260px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.location.hash = `#product?id=${product.id}`}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Top Badges / Icons */}
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110 transition-all text-slate-700"
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>

        {/* Quick Add Button (Visible on Hover) */}
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-300 ease-out",
          "group-hover:translate-y-0 group-hover:opacity-100"
        )}>
          <button className="w-full py-2.5 bg-white/95 backdrop-blur text-sm font-semibold text-slate-900 rounded-xl shadow-lg hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{product.brand}</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-slate-400">({product.reviews})</span>
          </div>
        </div>
        
        <h3 className="text-sm font-medium text-slate-900 leading-snug truncate">
          {product.name}
        </h3>
        
        <div className="mt-1 flex items-center gap-2">
          <span className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = ({ title, products }) => {
  return (
    <section className="py-8">
      <div className="flex items-center justify-between px-6 md:px-12 mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
        <button className="hidden sm:flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors">
          See All <ChevronRight className="w-4 h-4 ml-1" />
        </button>
      </div>
      
      <div className="relative">
        <div className="flex gap-4 sm:gap-6 px-6 md:px-12 overflow-x-auto snap-x hide-scrollbar pb-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="snap-start">
              <ProductCard product={product} />
            </div>
          ))}
          {/* Spacer for right padding on scroll */}
          <div className="min-w-[24px] sm:min-w-[48px] shrink-0" />
        </div>
      </div>
    </section>
  );
};

// --- Main Page ---
import { useEffect } from 'react';
import { apiClient } from './api/client.js';

export default function HomePage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [missionDismissed, setMissionDismissed] = useState(false);
  
  // Real data state
  const [feedData, setFeedData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchFeed = async () => {
      // Fetch from backend /api/v1/recommendations/home
      const data = await apiClient.get('/recommendations/home');
      if (data) {
        setFeedData(data);
      }
      setIsLoading(false);
    };
    fetchFeed();
  }, []);

  // Extract products from sections array
  const getSectionProducts = (type) => {
    return feedData?.sections?.find(s => s.type === type)?.products || null;
  };

  // Use dummy data as fallback if backend is slow/failing for the demo
  const displayProducts = getSectionProducts('recommended')?.map(item => ({
    id: item._id,
    name: item.title,
    brand: item.brand,
    price: item.price,
    rating: 4.8,
    reviews: 120,
    image: item.images?.[0] || DUMMY_PRODUCTS[0].image
  })) || DUMMY_PRODUCTS;

  const exploreProducts = getSectionProducts('explore')?.map(item => ({
    id: item._id,
    name: item.title,
    brand: item.brand,
    price: item.price,
    rating: 4.5,
    reviews: 80,
    image: item.images?.[0] || DUMMY_PRODUCTS[0].image
  })) || DUMMY_PRODUCTS;

  const newArrivals = getSectionProducts('trending')?.map(item => ({
    id: item._id,
    name: item.title,
    brand: item.brand,
    price: item.price,
    rating: 4.9,
    reviews: 30,
    image: item.images?.[0] || DUMMY_PRODUCTS[0].image
  })) || DUMMY_PRODUCTS;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. NAVIGATION */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4">
          
          {/* Left: Logo & Mobile Menu */}
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-slate-600">
              <Menu className="w-5 h-5" />
            </button>
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="hidden sm:block text-xl font-bold tracking-tight text-slate-900">
                Discover
              </span>
            </a>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-2xl hidden md:flex">
            <div className={cn(
              "relative w-full transition-all duration-300",
              searchFocused ? "shadow-md rounded-full bg-white ring-1 ring-blue-600" : "bg-slate-100 rounded-full"
            )}>
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className={cn("w-4 h-4", searchFocused ? "text-blue-600" : "text-slate-400")} />
              </div>
              <input 
                type="text" 
                placeholder="Search products, brands, or describe what you need..."
                className="w-full bg-transparent border-none pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-slate-900 placeholder:text-slate-500"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.hash = `#search?q=${e.target.value}`;
                  }
                }}
              />
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            <button className="md:hidden p-2 text-slate-600">
              <Search className="w-5 h-5" />
            </button>
            <IconButton icon={Heart} />
            <IconButton icon={User} />
            <IconButton icon={ShoppingBag} badge="3" />
          </div>

        </div>
      </header>

      <main className="max-w-[1600px] mx-auto pb-24">
        
        {/* 2. HERO BANNER */}
        <section className="px-4 sm:px-6 md:px-12 pt-8 pb-4">
          <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[480px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-slate-900 flex items-center">
            {/* Background Image / Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-800 to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1600&q=80" 
              className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
              alt="Hero Promotion"
            />
            
            {/* Content */}
            <div className="relative z-20 px-8 md:px-16 max-w-2xl">
              <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur-md rounded-full text-xs font-semibold text-white tracking-widest uppercase mb-4">
                New Collection
              </span>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
                Defy limits. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
                  Elevate performance.
                </span>
              </h1>
              <p className="text-sm sm:text-lg text-slate-300 mb-8 max-w-md font-medium">
                Discover the latest premium activewear designed for peak performance and ultimate comfort.
              </p>
              <button className="bg-white text-slate-900 px-8 py-3.5 rounded-full font-semibold text-sm hover:bg-slate-100 hover:scale-105 transition-all shadow-xl">
                Shop Collection
              </button>
            </div>
          </div>
        </section>

        {/* 3. SHOPPING MISSION CARD (Subtle AI Insight) */}
        {!missionDismissed && (
          <section className="px-4 sm:px-6 md:px-12 py-2">
            <div className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm transition-all hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Context</span>
                    <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Sparkles className="w-3 h-3" /> {feedData?.metrics?.candidateCount ? 'AI Generated' : '94% Match'}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-slate-900 mt-0.5">
                    {feedData?.intentContext?.dominantCategory || "Fitness & Training Journey"}
                  </h3>
                </div>
              </div>
              
              <div className="mt-4 sm:mt-0 flex items-center gap-3 w-full sm:w-auto">
                <p className="text-sm text-slate-500 hidden lg:block mr-4">
                  We've tailored today's recommendations to your active lifestyle.
                </p>
                <button className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors shadow-sm">
                  Refine Preferences
                </button>
                <button 
                  onClick={() => setMissionDismissed(true)}
                  className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                  aria-label="Dismiss"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>
        )}

        {/* 4. RECOMMENDED FOR YOU */}
        {isLoading ? (
          <div className="px-12 py-8 animate-pulse flex gap-6">
             <div className="w-64 h-80 bg-slate-100 rounded-2xl"></div>
             <div className="w-64 h-80 bg-slate-100 rounded-2xl"></div>
             <div className="w-64 h-80 bg-slate-100 rounded-2xl"></div>
          </div>
        ) : (
          <ProductCarousel 
            title="Recommended For You" 
            products={displayProducts} 
          />
        )}

        {/* Promotional Break */}
        <section className="px-4 sm:px-6 md:px-12 py-8">
          <div className="w-full bg-slate-50 rounded-3xl border border-slate-100 p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="max-w-xl">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-3 tracking-tight">
                Unlock Premium Member Benefits
              </h2>
              <p className="text-slate-500 text-sm sm:text-base leading-relaxed">
                Join Discover Engine Pro for free expedited shipping, early access to new drops, and highly curated personal styling sessions tailored by our AI engine.
              </p>
            </div>
            <button className="shrink-0 bg-slate-900 text-white px-8 py-4 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-colors shadow-lg w-full md:w-auto">
              Join For Free
            </button>
          </div>
        </section>

        {/* 8. EXPLORE MORE */}
        {!isLoading && (
          <ProductCarousel 
            title="Explore More Categories" 
            products={exploreProducts} 
          />
        )}

        {/* 9. NEW ARRIVALS */}
        {!isLoading && (
          <ProductCarousel 
            title="Fresh Drops & New Arrivals" 
            products={newArrivals} 
          />
        )}

      </main>
    </div>
  );
}
