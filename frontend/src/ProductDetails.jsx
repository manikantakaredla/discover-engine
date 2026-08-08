import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Menu, 
  Star, Plus, Sparkles, Check, ChevronRight, Share2, Shield, Truck
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Dummy Data ---
const PRODUCT = {
  id: 1,
  name: "Cloud-Step Pro Running Shoes",
  brand: "STRIDE",
  price: 165.00,
  rating: 4.9,
  reviews: 428,
  description: "Engineered for maximum energy return and supreme comfort. The Cloud-Step Pro features our latest responsive foam technology, a breathable engineered mesh upper, and a carbon-infused plate for effortless forward momentum.",
  images: [
    "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=80",
    "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&q=80",
    "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&q=80",
    "https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=800&q=80",
  ],
  colors: ["Crimson Red", "Onyx Black", "Glacier White"],
  sizes: ["UK 7", "UK 8", "UK 9", "UK 10", "UK 11", "UK 12"],
  inStock: true,
};

const RELATED_PRODUCTS = [
  { id: 101, name: "Pro Compression Tights", brand: "Aura", price: 89.00, rating: 4.9, reviews: 89, image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=500&q=80" },
  { id: 102, name: "Ultra-Light Workout Tee", brand: "Velocity", price: 45.00, rating: 4.8, reviews: 124, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80" },
  { id: 103, name: "Performance Quarter Socks", brand: "Stride", price: 18.00, rating: 4.7, reviews: 312, image: "https://images.unsplash.com/photo-1582966772680-860e372bb558?w=500&q=80" },
  { id: 104, name: "Hydration Flask 32oz", brand: "Aqua", price: 35.00, rating: 4.6, reviews: 56, image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&q=80" },
];

const COMPLEMENTARY_CATEGORIES = {
  'smartphones': ['laptops', 'lighting', 'automotive'],
  'laptops': ['smartphones', 'furniture', 'lighting'],
  'fragrances': ['skincare', 'womens-jewellery', 'womens-watches'],
  'skincare': ['fragrances', 'womens-jewellery', 'womens-dresses'],
  'groceries': ['home-decoration', 'furniture'],
  'home-decoration': ['furniture', 'lighting'],
  'furniture': ['home-decoration', 'lighting'],
  'tops': ['womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'],
  'womens-dresses': ['womens-shoes', 'womens-bags', 'womens-jewellery', 'womens-watches'],
  'womens-shoes': ['tops', 'womens-dresses', 'womens-bags', 'womens-jewellery'],
  'mens-shirts': ['mens-shoes', 'mens-watches', 'sunglasses'],
  'mens-shoes': ['mens-shirts', 'mens-watches', 'sunglasses'],
  'mens-watches': ['mens-shirts', 'mens-shoes', 'sunglasses'],
  'womens-watches': ['tops', 'womens-dresses', 'womens-jewellery', 'womens-bags'],
  'womens-bags': ['tops', 'womens-dresses', 'womens-shoes', 'womens-watches'],
  'womens-jewellery': ['tops', 'womens-dresses', 'womens-watches', 'fragrances'],
  'sunglasses': ['mens-shirts', 'mens-shoes', 'womens-dresses', 'tops'],
  'automotive': ['motorcycle', 'lighting'],
  'motorcycle': ['automotive'],
  'lighting': ['home-decoration', 'furniture']
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
      className="group flex flex-col min-w-[200px] max-w-[200px] sm:min-w-[240px] sm:max-w-[240px] cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        apiClient.post('/analytics/track', { 
            eventType: 'recommendation_click', 
            productId: product.id,
            metadata: { source: 'product_details_related' }
        }).catch(console.error);
        window.location.hash = `#product?id=${product.id}`;
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm hover:bg-white hover:scale-110 transition-all text-slate-700"
          >
            <Heart className={cn("w-4 h-4", isFavorite && "fill-red-500 text-red-500")} />
          </button>
        </div>
        <div className={cn(
          "absolute bottom-0 left-0 right-0 p-3 translate-y-full opacity-0 transition-all duration-300 ease-out",
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
          </div>
        </div>
        <h3 className="text-sm font-medium text-slate-900 leading-snug truncate">{product.name}</h3>
        <span className="text-sm font-semibold text-slate-900">₹{product.price.toFixed(2)}</span>
      </div>
    </div>
  );
};

const ProductCarousel = ({ title, products }) => (
  <section className="py-12 border-t border-slate-100">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
    </div>
    <div className="relative -mx-4 sm:-mx-0">
      <div className="flex gap-4 sm:gap-6 px-4 sm:px-0 overflow-x-auto snap-x hide-scrollbar pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {products.map((product, idx) => (
          <div key={`${product.id}-${idx}`} className="snap-start">
            <ProductCard product={product} />
          </div>
        ))}
        <div className="min-w-[16px] sm:min-w-[0px] shrink-0" />
      </div>
    </div>
  </section>
);

// --- Main Page ---
import { useEffect } from 'react';
import { apiClient } from './api/client.js';

export default function ProductDetailsPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(RELATED_PRODUCTS);
  const [completeLookProducts, setCompleteLookProducts] = useState(RELATED_PRODUCTS);
  const [isLoading, setIsLoading] = useState(true);

  // Added defaults since API products don't have these mock arrays
  const [selectedColor, setSelectedColor] = useState(PRODUCT.colors[0]);
  const [selectedSize, setSelectedSize] = useState(PRODUCT.sizes[2]);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      const hash = window.location.hash;
      const idParam = hash.split('id=')[1];
      
      try {
        let fetchedProduct = null;
        if (idParam) {
          const data = await apiClient.get(`/products/${idParam}`);
          fetchedProduct = data;
          if (data) {
            setProduct({
              id: data._id,
              name: data.title,
              brand: data.brand,
              price: data.price,
              rating: 4.8,
              reviews: 150,
              description: data.description,
              images: data.images?.length ? data.images : PRODUCT.images,
              colors: PRODUCT.colors,
              sizes: PRODUCT.sizes,
            });
          } else {
            setProduct(PRODUCT);
          }
        } else {
          setProduct(PRODUCT);
        }
        
        if (idParam) {
          apiClient.post('/analytics/track', { 
            eventType: 'page_view', 
            productId: idParam,
            metadata: { source: 'direct_load' }
          }).catch(console.error);
        }

        // Fetch real related products by category
        const categoryQuery = fetchedProduct && fetchedProduct.category 
          ? `?category=${encodeURIComponent(fetchedProduct.category)}&limit=15` 
          : '?limit=15';
        const relatedData = await apiClient.get(`/products${categoryQuery}`);
        
        // Fetch products for "Complete The Look" by fetching broader set
        const allData = await apiClient.get(`/products?limit=40`);
        
        if (relatedData && relatedData.products) {
           let filtered = relatedData.products;
           if (fetchedProduct) {
             filtered = filtered.filter(p => p._id !== fetchedProduct._id);
           }
           
           // Shuffle the filtered array to ensure dynamic recommendations every time
           filtered.sort(() => 0.5 - Math.random());
           
           const mappedRelated = filtered.slice(0, 8).map(p => ({
              id: p._id,
              name: p.title,
              brand: p.brand,
              price: p.price,
              rating: 4.5,
              reviews: 120,
              image: p.images?.[0] || RELATED_PRODUCTS[0].image
           }));
           setRelatedProducts(mappedRelated);
        }

        if (allData && allData.products) {
           let lookFiltered = allData.products;
           if (fetchedProduct && fetchedProduct.category) {
             const currentCategory = fetchedProduct.category.toLowerCase();
             const complementary = COMPLEMENTARY_CATEGORIES[currentCategory];
             
             if (complementary && complementary.length > 0) {
               // Include only items from complementary categories
               lookFiltered = lookFiltered.filter(p => complementary.includes(p.category.toLowerCase()));
               
               // If somehow we don't have enough matching complementary items, fallback to everything else
               if (lookFiltered.length < 4) {
                 lookFiltered = allData.products.filter(p => p.category !== fetchedProduct.category && p._id !== fetchedProduct._id);
               }
             } else {
               // Fallback if no specific mapping exists
               lookFiltered = lookFiltered.filter(p => p.category !== fetchedProduct.category && p._id !== fetchedProduct._id);
             }
           }
           
           lookFiltered.sort(() => 0.5 - Math.random());
           
           const mappedLook = lookFiltered.slice(0, 8).map(p => ({
              id: p._id,
              name: p.title,
              brand: p.brand,
              price: p.price,
              rating: 4.7,
              reviews: 85,
              image: p.images?.[0] || RELATED_PRODUCTS[1].image
           }));
           // Fallback to relatedProducts if not enough diverse products
           setCompleteLookProducts(mappedLook.length >= 2 ? mappedLook : relatedProducts);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [window.location.hash]); // Added hash dependency to trigger on same-page hash changes safely

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white"><div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>;
  }

  const currentProduct = product || PRODUCT;

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* 1. HEADER (Simplified copy of Home header) */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button className="md:hidden p-2 -ml-2 text-slate-600"><Menu className="w-5 h-5" /></button>
            <a href="#home" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
                <ShoppingBag className="w-4 h-4" />
              </div>
              <span className="hidden sm:block text-xl font-bold tracking-tight text-slate-900">Discover</span>
            </a>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <IconButton icon={Search} />
            <IconButton icon={Heart} />
            <IconButton icon={User} />
            <IconButton icon={ShoppingBag} badge="3" />
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-8 pb-24">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8">
          <a href="#home" className="hover:text-slate-900 transition-colors">Home</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#search?q=Men" className="hover:text-slate-900 transition-colors">Men</a>
          <ChevronRight className="w-3 h-3" />
          <a href="#search?q=Shoes" className="hover:text-slate-900 transition-colors">Shoes</a>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-900">{currentProduct.name}</span>
        </nav>

        {/* 2. PRODUCT MAIN SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left: Image Gallery */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Main Image */}
            <div className="relative aspect-[4/5] sm:aspect-square bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100">
              <img 
                src={currentProduct.images[activeImage]} 
                alt={currentProduct.name} 
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <button className="absolute top-4 right-4 p-3 rounded-full bg-white/80 backdrop-blur shadow-sm hover:bg-white transition-all text-slate-700">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
            
            {/* Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {currentProduct.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={cn(
                    "relative aspect-square rounded-2xl overflow-hidden border-2 transition-all",
                    activeImage === idx ? "border-blue-600 ring-2 ring-blue-600/20" : "border-transparent hover:border-slate-200"
                  )}
                >
                  <img src={img} alt={`Thumbnail ${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="lg:col-span-5 flex flex-col">
            
            <div className="mb-8">
              <h2 className="text-sm font-bold tracking-widest text-slate-500 uppercase mb-2">{currentProduct.brand}</h2>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight mb-4 leading-tight">
                {currentProduct.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-2xl font-semibold text-slate-900">₹{currentProduct.price.toFixed(2)}</span>
                <div className="h-6 w-px bg-slate-200" />
                <div className="flex items-center gap-2 cursor-pointer group">
                  <div className="flex text-blue-600">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={cn("w-4 h-4", i < Math.floor(currentProduct.rating) ? "fill-current" : "fill-transparent")} />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-slate-600 group-hover:text-blue-600 transition-colors">
                    {currentProduct.rating} ({currentProduct.reviews} Reviews)
                  </span>
                </div>
              </div>

              <p className="text-base text-slate-600 leading-relaxed">
                {currentProduct.description}
              </p>
            </div>

            {/* AI Explanation Card - Elegant & Subtle */}
            <div className="mb-10 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/50 p-5 shadow-[inset_0_1px_0_white]">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-sm font-semibold text-slate-900">Recommended for you because</span>
              </div>
              <ul className="space-y-2.5">
                <li className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  Aligns with your current fitness & training journey.
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  Matches your recent searches for high-performance running gear.
                </li>
                <li className="flex items-start gap-2.5 text-sm text-slate-600 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                  Highly rated by shoppers with similar active lifestyles.
                </li>
              </ul>
            </div>

            {/* Attributes: Color */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-900">Color</span>
                <span className="text-sm text-slate-500">{selectedColor}</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {currentProduct.colors.map(color => (
                  <button 
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={cn(
                      "px-4 py-2 rounded-xl border text-sm font-medium transition-all",
                      selectedColor === color 
                        ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    )}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Attributes: Size */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold text-slate-900">Size</span>
                <button className="text-sm font-medium text-blue-600 hover:underline">Size Guide</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                {currentProduct.sizes.map(size => (
                  <button 
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 rounded-xl border text-sm font-medium transition-all",
                      selectedSize === size 
                        ? "border-slate-900 bg-slate-900 text-white shadow-md" 
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-400"
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  const cart = JSON.parse(localStorage.getItem('discover_cart') || '[]');
                  const existing = cart.find(i => i._id === currentProduct._id);
                  if (existing) {
                    existing.quantity += 1;
                  } else {
                    cart.push({ ...currentProduct, quantity: 1 });
                  }
                  localStorage.setItem('discover_cart', JSON.stringify(cart));
                  window.dispatchEvent(new Event('cart-updated'));
                  
                  // Track add_to_cart event for analytics
                  apiClient.post('/analytics/track', { 
                    eventType: 'add_to_cart', 
                    productId: currentProduct._id 
                  }).catch(console.error);

                  window.location.hash = '#cart';
                }}
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-base shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Add to Cart — ₹{currentProduct.price.toFixed(2)}
              </button>
              <div className="flex gap-3">
                <button className="flex-1 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-base shadow-lg transition-all active:scale-[0.98]">
                  Buy It Now
                </button>
                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  className="px-6 rounded-2xl bg-white border border-slate-200 hover:bg-slate-50 transition-colors shadow-sm flex items-center justify-center"
                >
                  <Heart className={cn("w-5 h-5", isFavorite ? "fill-red-500 text-red-500" : "text-slate-700")} />
                </button>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="mt-8 flex flex-col gap-4 py-6 border-t border-b border-slate-100">
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-slate-900 block">Free Express Delivery</span>
                  Ships within 24 hours.
                </div>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-slate-900" />
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-slate-900 block">Extended Returns</span>
                  Return within 30 days of purchase.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 3. ADDITIONAL SECTIONS */}
        <div className="mt-16 sm:mt-24 space-y-4">
          <ProductCarousel title="Complete The Look" products={completeLookProducts} />
          <ProductCarousel title="Frequently Bought Together" products={[...relatedProducts].reverse()} />
        </div>

      </main>
    </div>
  );
}
