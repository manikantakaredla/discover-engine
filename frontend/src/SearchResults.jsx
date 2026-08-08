import React, { useState, useEffect, useMemo } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Menu, 
  Star, Plus, Sparkles, ChevronDown, SlidersHorizontal, Filter
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { apiClient } from './api/client.js';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const FILTERS = {
  categories: ["Running Shoes", "Apparel", "Accessories", "Electronics"],
  brands: ["Stride", "Velocity", "Aura", "Active", "Trek"],
  priceRanges: ["Under ₹4000", "₹4000 - ₹8000", "₹8000 - ₹16000", "Over ₹16000"],
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

const ProductCard = ({ product, query }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <div 
      className="group flex flex-col w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        apiClient.post('/analytics/track', { 
            eventType: 'product_click', 
            productId: product.id,
            metadata: { source: 'search_results', query }
        }).catch(console.error);
        window.location.hash = `#product?id=${product.id}`;
      }}
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
        <span className="text-sm font-semibold text-slate-900">₹{product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => (
  <div className="py-5 border-b border-slate-100 last:border-0">
    <h3 className="text-sm font-bold text-slate-900 mb-4">{title}</h3>
    <div className="space-y-3">
      {options.map((option, idx) => {
        const isChecked = selected.includes(option);
        return (
          <label key={idx} className="flex items-center gap-3 cursor-pointer group" onClick={() => onChange(option)}>
            <div className={cn("w-4 h-4 rounded border transition-colors flex items-center justify-center", isChecked ? "bg-blue-600 border-blue-600" : "bg-white border-slate-300 group-hover:border-blue-500")}>
              {isChecked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
            </div>
            <span className={cn("text-sm transition-colors", isChecked ? "text-slate-900 font-medium" : "text-slate-600 group-hover:text-slate-900")}>{option}</span>
          </label>
        );
      })}
    </div>
  </div>
);

// --- Main Page ---

export default function SearchResultsPage() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ aiSuggested: [], all: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Filters state
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);

  const toggleFilter = (setter, option) => {
    setter(prev => prev.includes(option) ? prev.filter(item => item !== option) : [...prev, option]);
  };

  useEffect(() => {
    // Parse ?q=... from hash #search?q=shoes
    const hash = window.location.hash;
    const qParam = hash.split('q=')[1];
    const searchQuery = qParam ? qParam : "Running Shoes";
    const decodedQuery = decodeURIComponent(searchQuery);
    setQuery(decodedQuery);

    const fetchSearch = async () => {
      setIsLoading(true);
      
      try {
        const data = await apiClient.get(`/search?q=${encodeURIComponent(decodedQuery)}`);
        
        // Track the search event
        apiClient.post('/analytics/track', { 
            eventType: 'search', 
            metadata: { query: decodedQuery } 
        }).catch(console.error);
        
        if (data && data.products) {
            // First 4 as highly relevant (simulating semantic match badge)
            const ai = data.products.slice(0, 4).map(c => ({
            id: c._id, name: c.title, brand: c.brand, category: c.category, price: c.price, rating: c.rating || 4.9, reviews: c.reviewCount || 120, image: c.images?.[0], semantic: true
            }));
            const all = data.products.slice(4).map(c => ({
            id: c._id, name: c.title, brand: c.brand, category: c.category, price: c.price, rating: c.rating || 4.5, reviews: c.reviewCount || 80, image: c.images?.[0]
            }));
            setResults({ aiSuggested: ai, all: all });
        } else {
            setResults({ aiSuggested: [], all: [] });
        }
      } catch (err) {
        setResults({ aiSuggested: [], all: [] });
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

  // Filter Logic
  const filterProducts = (products) => {
    return products.filter(product => {
      const matchCategory = selectedCategories.length === 0 || selectedCategories.some(c => product.category?.toLowerCase().includes(c.toLowerCase()) || product.name?.toLowerCase().includes(c.toLowerCase()));
      const matchBrand = selectedBrands.length === 0 || selectedBrands.some(b => product.brand?.toLowerCase() === b.toLowerCase());
      
      let matchPrice = true;
      if (selectedPrices.length > 0) {
        matchPrice = selectedPrices.some(range => {
          if (range === "Under ₹4000") return product.price < 4000;
          if (range === "₹4000 - ₹8000") return product.price >= 4000 && product.price <= 8000;
          if (range === "₹8000 - ₹16000") return product.price > 8000 && product.price <= 16000;
          if (range === "Over ₹16000") return product.price > 16000;
          return true;
        });
      }

      return matchCategory && matchBrand && matchPrice;
    });
  };

  const filteredAiSuggested = useMemo(() => filterProducts(results.aiSuggested), [results.aiSuggested, selectedCategories, selectedBrands, selectedPrices]);
  const filteredAll = useMemo(() => filterProducts(results.all), [results.all, selectedCategories, selectedBrands, selectedPrices]);

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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
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
            <p className="text-sm text-slate-500 mt-1">Showing {filteredAiSuggested.length + filteredAll.length} results</p>
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
              <FilterSection title="Category" options={FILTERS.categories} selected={selectedCategories} onChange={(opt) => toggleFilter(setSelectedCategories, opt)} />
              <FilterSection title="Brand" options={FILTERS.brands} selected={selectedBrands} onChange={(opt) => toggleFilter(setSelectedBrands, opt)} />
              <FilterSection title="Price" options={FILTERS.priceRanges} selected={selectedPrices} onChange={(opt) => toggleFilter(setSelectedPrices, opt)} />
              
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
                    {filteredAiSuggested.length > 0 && (
                        <section>
                        <div className="flex items-center gap-2 mb-5 pb-3 border-b border-slate-100">
                            <Sparkles className="w-5 h-5 text-blue-600" />
                            <h2 className="text-lg font-bold text-slate-900">Highly Relevant Matches</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredAiSuggested.map(product => (
                            <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        </section>
                    )}

                    {/* Standard Results */}
                    {filteredAll.length > 0 && (
                        <section>
                        <div className="mb-5 pb-3 border-b border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900">All Results</h2>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                            {filteredAll.map(product => (
                            <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                        </section>
                    )}

                    {filteredAiSuggested.length === 0 && filteredAll.length === 0 && (
                        <div className="py-20 text-center">
                           <p className="text-lg text-slate-500 font-medium">No products found matching your filters.</p>
                           <button onClick={() => { setSelectedCategories([]); setSelectedBrands([]); setSelectedPrices([]); }} className="mt-4 text-blue-600 font-semibold hover:underline">Clear all filters</button>
                        </div>
                    )}
                </>
            )}

          </div>
        </div>

      </main>
    </div>
  );
}
