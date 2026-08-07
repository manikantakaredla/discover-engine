import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Menu, 
  Star, Plus, Sparkles, ChevronDown, SlidersHorizontal, Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Dummy Data ---
const AI_SUGGESTED = [
  { id: 201, name: "Cloud-Step Pro Running Shoes", brand: "Stride", price: 165.00, rating: 4.9, reviews: 428, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80", semantic: true },
  { id: 202, name: "Aero Glide Marathon Runners", brand: "Velocity", price: 145.00, rating: 4.8, reviews: 156, image: "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=500&q=80", semantic: true },
  { id: 203, name: "Ultra-Light Workout Tee", brand: "Velocity", price: 45.00, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80", semantic: true },
];

const ALL_RESULTS = [
  { id: 1, name: "Basic Running Shoes", brand: "Active", price: 85.00, rating: 4.2, reviews: 89, image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=500&q=80" },
  { id: 2, name: "Trail Blazer Kicks", brand: "Trek", price: 110.00, rating: 4.5, reviews: 212, image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500&q=80" },
  { id: 3, name: "Performance Quarter Socks", brand: "Stride", price: 18.00, rating: 4.7, reviews: 312, image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=500&q=80" },
  { id: 4, name: "Hydration Flask 32oz", brand: "Aqua", price: 35.00, rating: 4.6, reviews: 56, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80" },
  { id: 5, name: "Pro Compression Tights", brand: "Aura", price: 89.00, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80" },
  { id: 6, name: "Smart Fitness Watch", brand: "Pulse", price: 199.00, rating: 4.9, reviews: 892, image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80" },
  { id: 7, name: "Resistance Band Set", brand: "Flex", price: 24.00, rating: 4.8, reviews: 432, image: "https://images.unsplash.com/photo-1598266663412-7bb88e634794?w=500&q=80" },
  { id: 8, name: "Gym Duffel Bag", brand: "Active", price: 55.00, rating: 4.4, reviews: 145, image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80" },
];

const FILTERS = {
  categories: ["Running Shoes", "Apparel", "Accessories", "Electronics"],
  brands: ["Stride", "Velocity", "Aura", "Active", "Trek"],
  priceRanges: ["Under $50", "$50 - $100", "$100 - $200", "Over $200"],
};

// --- Sub Components ---
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
      className="group flex flex-col w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => window.location.hash = `#product?id=${product.id}`}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4 border border-slate-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Semantic Match Badge */}
        {product.semantic && (
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-100 flex items-center gap-1.5 z-10">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Semantic Match</span>
          </div>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110 transition-all text-slate-700"
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>
        
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-300 ease-out z-10",
          "group-hover:translate-y-0 group-hover:opacity-100"
        )}>
          <button className="w-full py-2.5 bg-white/95 backdrop-blur text-sm font-semibold text-slate-900 rounded-xl shadow-lg hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2">
            <Plus className="w-4 h-4" /> Quick Add
          </button>
        </div>
      </div>
      
      <div className="flex flex-col gap-1 px-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold tracking-wider text-slate-500 uppercase">{product.brand}</span>
          <div className="flex items-center gap-1 text-slate-700">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span className="text-xs font-medium">{product.rating}</span>
            <span className="text-xs text-slate-400 hidden sm:inline-block">({product.reviews})</span>
          </div>
        </div>
        <h3 className="text-sm font-medium text-slate-900 leading-snug truncate">{product.name}</h3>
        <span className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options }) => (
  <div className="py-5 border-b border-slate-100 last:border-0">
    <h3 className="text-sm font-bold text-slate-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {options.map((option, idx) => (
        <label key={idx} className="flex items-center gap-3 cursor-pointer group">
          <div className="w-4 h-4 rounded border border-slate-300 group-hover:border-blue-500 transition-colors flex items-center justify-center bg-white" />
          <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
        </label>
      ))}
    </div>
  </div>
);

// --- Main Page ---
import { useEffect } from 'react';
import { apiClient } from './api/client.js';

export default function SearchResultsPage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ aiSuggested: [], all: [] });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Parse ?q=... from hash #search?q=shoes
    const hash = window.location.hash;
    const qParam = hash.split('q=')[1];
    const decodedQuery = qParam ? decodeURIComponent(qParam) : "Running Shoes";
    setQuery(decodedQuery);

    const fetchSearch = async () => {
      setIsLoading(true);
      const data = await apiClient.post('/search', { query: decodedQuery, sessionId: 'demo-session-123' });
      
      if (data && data.candidates) {
        // Mock splitting semantic vs standard for UI demo purposes
        const ai = data.candidates.slice(0, 4).map(c => ({
           id: c._id, name: c.title, brand: c.brand, price: c.price, rating: 4.9, reviews: 120, image: c.images?.[0] || AI_SUGGESTED[0].image, semantic: true
        }));
        const all = data.candidates.slice(4).map(c => ({
           id: c._id, name: c.title, brand: c.brand, price: c.price, rating: 4.5, reviews: 80, image: c.images?.[0] || ALL_RESULTS[0].image
        }));
        setResults({ aiSuggested: ai.length > 0 ? ai : AI_SUGGESTED, all: all.length > 0 ? all : ALL_RESULTS });
      } else {
        // Fallback
        setResults({ aiSuggested: AI_SUGGESTED, all: ALL_RESULTS });
      }
      setIsLoading(false);
    };

    fetchSearch();

    // Listen to hash changes without reloading
    const handleHash = () => {
        const newHash = window.location.hash;
        if(newHash.startsWith('#search')) {
            const newQ = newHash.split('q=')[1];
            if(newQ && decodeURIComponent(newQ) !== query) {
                setQuery(decodeURIComponent(newQ));
                fetchSearch();
            }
        }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. HEADER & SEARCH BAR */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-slate-600"><Menu className="w-5 h-5" /></button>
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="hidden lg:block text-xl font-bold tracking-tight text-slate-900">Discover</span>
            </a>
          </div>

          {/* Central Search Bar (Expanded/Focused state by default on search results page) */}
          <div className="flex-1 max-w-3xl flex">
            <div className="relative w-full shadow-sm rounded-full bg-slate-50 border border-slate-200 focus-within:ring-2 focus-within:ring-blue-600 focus-within:border-transparent transition-all">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="w-4 h-4 text-slate-400" />
              </div>
              <input 
                type="text" 
                defaultValue={query}
                className="w-full bg-transparent border-none pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-slate-900 placeholder:text-slate-500 font-medium"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.hash = `#search?q=${e.target.value}`;
                  }
                }}
              />
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton icon={Heart} />
            <IconButton icon={User} />
            <IconButton icon={ShoppingBag} badge="3" />
          </div>
        </div>
      </header>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-24">
        
        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Results for "{query}"
            </h1>
            <p className="text-sm text-slate-500 mt-1">Showing {results.aiSuggested.length + results.all.length} results</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50"
              onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            >
              <Filter className="w-4 h-4" /> Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors bg-white">
              <SlidersHorizontal className="w-4 h-4 text-slate-400" /> 
              Sort by: Recommended <ChevronDown className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>

        <div className="flex gap-10">
          
          {/* 2. FILTERS SIDEBAR (Desktop) */}
          <aside className={cn(
            "w-64 shrink-0 flex-col gap-2",
            mobileFiltersOpen ? "flex" : "hidden lg:flex"
          )}>
            <div className="sticky top-24 bg-white">
              <FilterSection title="Category" options={FILTERS.categories} />
              <FilterSection title="Brand" options={FILTERS.brands} />
              <FilterSection title="Price" options={FILTERS.priceRanges} />
              
              <div className="py-5 border-b border-slate-100">
                <h3 className="text-sm font-bold text-slate-900 mb-4">Rating</h3>
                <div className="space-y-3">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-4 h-4 rounded border border-slate-300 group-hover:border-blue-500 transition-colors bg-white" />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={cn("w-3.5 h-3.5", i < rating ? "fill-yellow-400 text-yellow-400" : "fill-slate-200 text-slate-200")} />
                        ))}
                        <span className="text-xs text-slate-500 ml-1">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* 3. RESULTS AREA */}
          <div className="flex-1 flex flex-col gap-12 min-w-0">
            {isLoading ? (
                <div className="animate-pulse space-y-8">
                    <div className="h-40 bg-slate-100 rounded-2xl w-full"></div>
                    <div className="h-80 bg-slate-100 rounded-2xl w-full"></div>
                </div>
            ) : (
                <>
                    {/* AI Suggested Results */}
                    {results.aiSuggested.length > 0 && (
                        <section>
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-slate-900">Highly Relevant Matches</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {results.aiSuggested.map(product => (
                            <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        </section>
                    )}

                    {/* Standard Results */}
                    {results.all.length > 0 && (
                        <section>
                        <div className="mb-5 pb-3 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">All Results</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {results.all.map(product => (
                            <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        </section>
                    )}
                </>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}
