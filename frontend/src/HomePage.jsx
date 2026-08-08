import React, { useState, useEffect } from 'react';
import { 
  Search, ShoppingCart, Heart, User, Menu, 
  ChevronRight, Star, Plus, MapPin, Zap
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { apiClient } from './api/client.js';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Flipkart Specific Components ---

const TopCategoryBar = () => {
  const categories = [
    { name: "Top Offers", img: "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=150&q=80" },
    { name: "Mobiles & Tablets", img: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&q=80" },
    { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=150&q=80" },
    { name: "TVs & Appliances", img: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=150&q=80" },
    { name: "Fashion", img: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=150&q=80" },
    { name: "Beauty", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=150&q=80" },
    { name: "Home & Kitchen", img: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&q=80" },
    { name: "Furniture", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=150&q=80" },
    { name: "Travel", img: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=150&q=80" },
  ];

  return (
    <div className="bg-white shadow-sm mt-1 mb-2 overflow-x-auto hide-scrollbar">
      <div className="max-w-[1600px] mx-auto px-4 py-3 flex gap-8 justify-between min-w-max">
        {categories.map((cat, i) => (
          <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-slate-50">
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
            </div>
            <span className="text-sm font-medium text-slate-800">{cat.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const FlipkartCard = ({ product }) => {
  // Generate a fake original price and discount for the "deal" effect
  const discount = Math.floor(Math.random() * 40) + 10; // 10% to 50%
  const originalPrice = Math.floor(product.price / (1 - (discount / 100)));

  return (
    <div 
      className="group flex flex-col w-[200px] sm:w-[230px] p-4 bg-white border border-slate-100 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer h-full relative"
      onClick={() => {
        import('./api/client.js').then(({ apiClient }) => {
          apiClient.post('/analytics/track', { eventType: 'product_click', productId: product.id }).catch(() => {});
        });
        window.location.hash = `#product?id=${product.id}`;
      }}
    >
      <div className="absolute top-2 right-2 z-10">
        <Heart className="w-5 h-5 text-slate-300 hover:text-red-500 hover:fill-red-500 transition-colors" />
      </div>

      <div className="w-full aspect-[4/5] overflow-hidden bg-white mb-4 flex items-center justify-center p-2">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
      </div>

      <div className="flex flex-col flex-1">
        <div className="text-sm font-bold text-slate-500 truncate mb-1">{product.brand}</div>
        <div className="text-sm text-slate-800 truncate mb-2 group-hover:text-blue-600 transition-colors">
          {product.name}
        </div>
        
        {/* Rating Badge */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center gap-1 bg-green-600 text-white px-1.5 py-0.5 rounded text-[11px] font-bold">
            {product.rating} <Star className="w-3 h-3 fill-current" />
          </div>
          <span className="text-xs text-slate-500 font-medium">({product.reviews})</span>
        </div>

        {/* Pricing */}
        <div className="flex items-end gap-2 mt-auto">
          <span className="text-base font-bold text-slate-900">₹{product.price.toFixed(0)}</span>
          <span className="text-sm text-slate-500 line-through">₹{originalPrice}</span>
          <span className="text-sm font-bold text-green-600">{discount}% off</span>
        </div>
      </div>
    </div>
  );
};

const FlipkartCarousel = ({ title, products, subtitle }) => {
  if (!products || products.length === 0) return null;
  return (
    <section className="bg-white shadow-sm mb-2">
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
        <div>
          <h2 className="text-xl font-bold text-slate-900">{title}</h2>
          {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
        <button className="bg-blue-600 text-white px-4 py-1.5 rounded-sm font-semibold text-sm hover:bg-blue-700 transition-colors shadow-sm">
          VIEW ALL
        </button>
      </div>
      
      <div className="relative">
        <div className="flex overflow-x-auto hide-scrollbar [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {products.map((product, idx) => (
            <div key={`${product.id}-${idx}`} className="shrink-0 border-r border-slate-100 last:border-r-0">
              <FlipkartCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// --- Main Page ---
export default function HomePage() {
  const [searchFocused, setSearchFocused] = useState(false);
  
  // Real data state
  const [feedData, setFeedData] = useState(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      // Log page view
      apiClient.post('/analytics/track', { eventType: 'page_view' }).catch(() => {});
      
      try {
        const [recommendations, productsRes] = await Promise.all([
          apiClient.get('/recommendations/home'),
          apiClient.get('/products')
        ]);

        if (recommendations) setFeedData(recommendations);
        if (productsRes && productsRes.products) {
          setAllProducts(productsRes.products.map(item => ({
            id: item._id,
            name: item.title,
            brand: item.brand,
            price: item.price,
            rating: item.rating || (4 + Math.random()).toFixed(1),
            reviews: item.reviewCount || Math.floor(Math.random() * 500) + 50,
            image: item.images?.[0]
          })));
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      }
      setIsLoading(false);
    };
    fetchData();

    const updateCartCount = () => {
      try {
        const items = JSON.parse(localStorage.getItem('discover_cart') || '[]');
        setCartCount(items.reduce((acc, item) => acc + (item.quantity || 1), 0));
      } catch (e) { setCartCount(0); }
    };

    updateCartCount();
    window.addEventListener('cart-updated', updateCartCount);
    return () => window.removeEventListener('cart-updated', updateCartCount);
  }, []);

  // Extract products from sections array
  const getSectionProducts = (type) => {
    const products = feedData?.sections?.find(s => s.type === type)?.products;
    return products?.map(item => ({
      id: item._id,
      name: item.title,
      brand: item.brand,
      price: item.price,
      rating: item.rating || (4 + Math.random()).toFixed(1),
      reviews: item.reviewCount || Math.floor(Math.random() * 500) + 50,
      image: item.images?.[0]
    })) || [];
  };

  const recommended = getSectionProducts('recommended');
  const trending = getSectionProducts('trending');
  const explore = getSectionProducts('explore');

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. FLIPKART STYLE HEADER */}
      <header className="sticky top-0 z-50 bg-blue-600 text-white shadow-md">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-6">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-4">
            <button className="md:hidden p-1"><Menu className="w-6 h-6" /></button>
            <a href="#home" className="flex items-center gap-1 flex-col justify-center italic font-bold">
              <span className="text-xl tracking-tight leading-none">Discover</span>
              <span className="text-[10px] text-yellow-400 leading-none flex items-center">
                Explore Plus <Zap className="w-3 h-3 fill-current ml-0.5" />
              </span>
            </a>
          </div>

          {/* Center: Search Bar */}
          <div className="flex-1 max-w-3xl hidden md:flex">
            <div className="relative w-full bg-white rounded-sm shadow-sm flex items-center overflow-hidden h-9">
              <input 
                type="text" 
                placeholder="Search for products, brands and more"
                className="w-full bg-transparent border-none px-4 text-sm focus:outline-none focus:ring-0 text-slate-900 placeholder:text-slate-500 h-full"
                onFocus={() => setSearchFocused(true)}
                onBlur={() => setSearchFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    window.location.hash = `#search?q=${e.target.value}`;
                  }
                }}
              />
              <button className="px-4 h-full bg-white flex items-center justify-center">
                <Search className="w-5 h-5 text-blue-600" />
              </button>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-6 font-medium text-sm">
            <button className="hidden md:block bg-white text-blue-600 px-8 py-1 rounded-sm shadow-sm font-bold">
              Login
            </button>
            <a href="#" className="hidden md:flex items-center hover:text-yellow-400">
              Become a Seller
            </a>
            <a href="#" className="hidden md:flex items-center gap-1 hover:text-yellow-400">
              <span className="font-semibold">More</span> <ChevronRight className="w-4 h-4 rotate-90" />
            </a>
            <button onClick={() => window.location.hash = '#cart'} className="flex items-center gap-2 hover:text-yellow-400 relative">
              <ShoppingBag className="w-5 h-5" />
              <span className="hidden sm:inline font-semibold">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -left-2 bg-yellow-500 text-slate-900 text-[10px] font-bold px-1.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* 2. TOP CATEGORIES */}
      <TopCategoryBar />

      <main className="max-w-[1600px] mx-auto pb-24 px-2 sm:px-4">
        
        {/* 3. HERO BANNER CAROUSEL (Simplified) */}
        <section className="mb-2">
          <div className="w-full h-[200px] sm:h-[280px] bg-indigo-900 cursor-pointer flex items-center relative shadow-sm overflow-hidden group">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80" 
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-50"
              alt="Sale Banner"
            />
            <div className="relative z-10 px-12 text-white max-w-xl">
              <h2 className="text-4xl font-extrabold italic tracking-tight mb-2">BIG DIWALI SALE</h2>
              <p className="text-xl font-semibold mb-4 text-yellow-400">Up to 80% Off on Top Brands</p>
              <button className="bg-yellow-400 text-slate-900 px-6 py-2 font-bold text-sm rounded-sm hover:bg-yellow-500">
                SHOP NOW
              </button>
            </div>
          </div>
        </section>

        {/* 4. CAROUSELS */}
        {isLoading ? (
          <div className="py-8 text-center text-slate-500 font-medium">Loading amazing deals...</div>
        ) : (
          <>
            <FlipkartCarousel 
              title="Deals of the Day" 
              subtitle="Grab them before they are gone"
              products={trending} 
            />
            
            {feedData?.intentContext?.dominantCategory && (
              <FlipkartCarousel 
                title={`Based on your interest in ${feedData.intentContext.dominantCategory}`} 
                subtitle="Recommended just for you"
                products={recommended} 
              />
            )}
            
            {!feedData?.intentContext?.dominantCategory && (
              <FlipkartCarousel 
                title="Recommended For You" 
                subtitle="Based on your recent activity"
                products={recommended} 
              />
            )}

            <FlipkartCarousel 
              title="Explore Top Brands" 
              products={explore} 
            />
          </>
        )}

        {/* 5. ALL PRODUCTS GRID */}
        {!isLoading && allProducts.length > 0 && (
          <section className="mt-4">
            <div className="bg-white shadow-sm mb-2 px-6 py-4 border-b border-slate-100">
              <h2 className="text-xl font-bold text-slate-900">Discover More Products</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 bg-white">
              {allProducts.map((product) => (
                <div key={product.id} className="border-b border-r border-slate-100 last:border-r-0">
                  <FlipkartCard product={product} />
                </div>
              ))}
            </div>
            
            {/* Load More Fake Button */}
            <div className="bg-white p-4 flex justify-center border-t border-slate-100">
               <button className="text-blue-600 font-semibold px-12 py-3 border border-blue-200 rounded-sm hover:bg-blue-50 transition-colors">
                  Load More Products
               </button>
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
