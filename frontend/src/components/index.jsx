import React, { useState } from 'react';
import { 
  Search, ShoppingBag, Heart, User, Menu, Star, Plus, Target, 
  Sparkles, X, ChevronRight, AlertCircle, PackageX, Check
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { motion, AnimatePresence } from 'framer-motion';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Animation Configs (Apple Style: Subtle, Fast, Springy) ---
const springTransition = { type: "spring", stiffness: 400, damping: 30 };
const fadeTransition = { duration: 0.2, ease: "easeOut" };

// ----------------------------------------------------------------------
// 1. Navbar
// ----------------------------------------------------------------------
export const Navbar = ({ searchFocused, onSearchFocus, onSearchBlur }) => (
  <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-100">
    <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-12 h-16 flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <motion.button whileTap={{ scale: 0.9 }} className="md:hidden p-2 -ml-2 text-slate-600">
          <Menu className="w-5 h-5" />
        </motion.button>
        <a href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 text-white rounded-lg flex items-center justify-center">
            <ShoppingBag className="w-4 h-4" />
          </div>
          <span className="hidden sm:block text-xl font-bold tracking-tight text-slate-900">Discover</span>
        </a>
      </div>
      <div className="flex-1 max-w-2xl hidden md:flex">
        <SearchBar focused={searchFocused} onFocus={onSearchFocus} onBlur={onSearchBlur} />
      </div>
      <div className="flex items-center gap-1 sm:gap-2">
        <motion.button whileTap={{ scale: 0.9 }} className="md:hidden p-2 text-slate-600"><Search className="w-5 h-5" /></motion.button>
        <IconButton icon={Heart} />
        <IconButton icon={User} />
        <IconButton icon={ShoppingBag} badge="3" />
      </div>
    </div>
  </header>
);

const IconButton = ({ icon: Icon, badge, className }) => (
  <motion.button 
    whileTap={{ scale: 0.95 }}
    className={cn("relative p-2 rounded-full hover:bg-slate-100 transition-colors text-slate-700", className)}
  >
    <Icon className="w-5 h-5" strokeWidth={2} />
    {badge && (
      <motion.span 
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={springTransition}
        className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-bold text-white"
      >
        {badge}
      </motion.span>
    )}
  </motion.button>
);

// ----------------------------------------------------------------------
// 2. Search Bar
// ----------------------------------------------------------------------
export const SearchBar = ({ focused, onFocus, onBlur, defaultValue = "" }) => (
  <motion.div 
    layout
    transition={springTransition}
    className={cn(
      "relative w-full overflow-hidden",
      focused ? "shadow-md rounded-full bg-white ring-2 ring-blue-600 border-transparent" : "bg-slate-50 border border-slate-200 rounded-full"
    )}
  >
    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
      <Search className={cn("w-4 h-4 transition-colors", focused ? "text-blue-600" : "text-slate-400")} />
    </div>
    <input 
      type="text" 
      defaultValue={defaultValue}
      placeholder="Search products, brands..."
      className="w-full bg-transparent border-none pl-11 pr-4 py-2.5 text-sm focus:outline-none focus:ring-0 text-slate-900 placeholder:text-slate-500 font-medium"
      onFocus={onFocus}
      onBlur={onBlur}
    />
  </motion.div>
);

// ----------------------------------------------------------------------
// 3. Sidebar (Filters)
// ----------------------------------------------------------------------
export const Sidebar = ({ filters, isOpen, onClose }) => (
  <AnimatePresence>
    {(isOpen || window.innerWidth >= 1024) && (
      <motion.aside 
        initial={isOpen ? { x: -20, opacity: 0 } : false}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -20, opacity: 0 }}
        transition={fadeTransition}
        className={cn(
          "w-64 shrink-0 flex-col gap-2",
          isOpen ? "flex absolute z-40 bg-white p-4 shadow-xl h-full" : "hidden lg:flex"
        )}
      >
        <div className="sticky top-24 bg-white">
          {isOpen && (
            <div className="flex justify-between items-center mb-4 lg:hidden">
              <h2 className="font-bold">Filters</h2>
              <button onClick={onClose}><X className="w-5 h-5" /></button>
            </div>
          )}
          {filters.map((group, idx) => (
            <div key={idx} className="py-5 border-b border-slate-100 last:border-0">
              <h3 className="text-sm font-bold text-slate-900 mb-4">{group.title}</h3>
              <div className="space-y-3">
                {group.options.map((option, oIdx) => (
                  <label key={oIdx} className="flex items-center gap-3 cursor-pointer group">
                    <motion.div 
                      whileHover={{ scale: 1.1 }} 
                      whileTap={{ scale: 0.9 }}
                      className="w-4 h-4 rounded border border-slate-300 group-hover:border-blue-500 transition-colors flex items-center justify-center bg-white" 
                    />
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.aside>
    )}
  </AnimatePresence>
);

// ----------------------------------------------------------------------
// 4. Product Card
// ----------------------------------------------------------------------
export const ProductCard = ({ product, semanticMatch = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      transition={springTransition}
      className="group flex flex-col w-full cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-slate-100 mb-4 border border-slate-100">
        <motion.img 
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          src={product.image} 
          alt={product.name}
          className="object-cover w-full h-full"
          loading="lazy"
        />
        {semanticMatch && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-3 left-3 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-md shadow-sm border border-slate-100 flex items-center gap-1.5 z-10"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-700">Semantic Match</span>
          </motion.div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
          <motion.button 
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={(e) => { e.stopPropagation(); setIsFavorite(!isFavorite); }}
            className="p-2 rounded-full bg-white/90 backdrop-blur-sm shadow-sm text-slate-700"
          >
            <Heart className={cn("w-4 h-4 transition-colors", isFavorite && "fill-red-500 text-red-500")} />
          </motion.button>
        </div>
        
        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute bottom-0 left-0 right-0 p-3 z-10"
            >
              <motion.button 
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 bg-white/95 backdrop-blur text-sm font-semibold text-slate-900 rounded-xl shadow-lg hover:bg-slate-900 hover:text-white transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" /> Quick Add
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
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
        <span className="text-sm font-semibold text-slate-900">${product.price.toFixed(2)}</span>
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 5. Mission Card (Shopping Goal)
// ----------------------------------------------------------------------
export const MissionCard = ({ intent, confidence, onDismiss, onRefine }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, scale: 0.98 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.98, height: 0, overflow: 'hidden' }}
    transition={springTransition}
    className="group relative flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gradient-to-r from-slate-50 to-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-md"
  >
    <div className="flex items-center gap-4">
      <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-50 text-blue-600 shrink-0">
        <Target className="w-5 h-5" />
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Context</span>
          <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
            <Sparkles className="w-3 h-3" /> {confidence}% Match
          </span>
        </div>
        <h3 className="text-base font-semibold text-slate-900 mt-0.5">{intent}</h3>
      </div>
    </div>
    <div className="mt-4 sm:mt-0 flex items-center gap-3 w-full sm:w-auto">
      <motion.button whileTap={{ scale: 0.95 }} onClick={onRefine} className="flex-1 sm:flex-none px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 shadow-sm">
        Refine
      </button>
      <motion.button whileTap={{ scale: 0.9 }} onClick={onDismiss} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg">
        <X className="w-4 h-4" />
      </motion.button>
    </div>
  </motion.div>
);

// ----------------------------------------------------------------------
// 6. Recommendation Card (AI Explanation)
// ----------------------------------------------------------------------
export const RecommendationCard = ({ reasons = [] }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={fadeTransition}
    className="bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-2xl border border-blue-100/50 p-5 shadow-[inset_0_1px_0_white]"
  >
    <div className="flex items-center gap-2 mb-3">
      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600">
        <Sparkles className="w-3.5 h-3.5" />
      </div>
      <span className="text-sm font-semibold text-slate-900">Recommended for you because</span>
    </div>
    <ul className="space-y-2.5">
      {reasons.map((reason, idx) => (
        <motion.li 
          key={idx} 
          initial={{ opacity: 0, x: -5 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: idx * 0.1, ...fadeTransition }}
          className="flex items-start gap-2.5 text-sm text-slate-600 font-medium"
        >
          <Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
          {reason}
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

// ----------------------------------------------------------------------
// 7 & 8. Data Cards (Analytics & KPI)
// ----------------------------------------------------------------------
export const DataCard = ({ title, value, unit, trend, trendValue, icon: Icon, isGood = true, style = 'vercel' }) => {
  const isStripe = style === 'stripe';
  return (
    <motion.div 
      whileHover={{ y: -2 }}
      transition={springTransition}
      className={cn(
        "flex flex-col p-5 bg-white border border-slate-200 rounded-xl transition-all",
        isStripe ? "shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)]" : "shadow-sm hover:shadow-md"
      )}
    >
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-4 h-4 text-slate-400" />
        <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      </div>
      <div className={cn("flex items-end justify-between mt-auto", !isStripe && "flex-col items-start gap-1 justify-start")}>
        <div className="flex items-baseline gap-1">
          <span className={cn("text-2xl font-semibold tracking-tight text-slate-900", !isStripe && "font-mono")}>{value}</span>
          {unit && <span className={cn("text-sm font-medium text-slate-500", !isStripe && "font-mono")}>{unit}</span>}
        </div>
        {trendValue && (
          <span className={cn(
            isStripe ? "text-xs font-semibold px-2 py-1 rounded-md" : "mt-2 text-xs font-medium flex items-center gap-1.5",
            isGood ? (isStripe ? "bg-emerald-50 text-emerald-600" : "text-emerald-600") : (isStripe ? "bg-rose-50 text-rose-600" : "text-amber-600")
          )}>
            {isStripe ? trendValue : <>{trend === 'up' ? '↑' : '↓'} {trendValue}</>}
            {!isStripe && <span className="text-slate-400 font-normal">vs last hour</span>}
          </span>
        )}
      </div>
    </motion.div>
  );
};

// ----------------------------------------------------------------------
// 9. Section Header
// ----------------------------------------------------------------------
export const SectionHeader = ({ title, actionLabel, onAction }) => (
  <div className="flex items-center justify-between px-6 md:px-12 mb-6">
    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">{title}</h2>
    {actionLabel && (
      <motion.button 
        whileHover={{ x: 2 }}
        onClick={onAction} 
        className="hidden sm:flex items-center text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
      >
        {actionLabel} <ChevronRight className="w-4 h-4 ml-1" />
      </motion.button>
    )}
  </div>
);

// ----------------------------------------------------------------------
// 10. Loading Skeleton (Card)
// ----------------------------------------------------------------------
export const LoadingSkeleton = () => (
  <div className="flex flex-col w-full">
    <motion.div 
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="aspect-[4/5] bg-slate-100 rounded-2xl mb-4 w-full" 
    />
    <div className="flex flex-col gap-2 px-1">
      <div className="flex items-center justify-between">
        <div className="h-3 w-16 bg-slate-100 rounded" />
        <div className="h-3 w-10 bg-slate-100 rounded" />
      </div>
      <div className="h-4 w-3/4 bg-slate-100 rounded mt-1" />
      <div className="h-4 w-1/3 bg-slate-100 rounded mt-1" />
    </div>
  </div>
);

// ----------------------------------------------------------------------
// 11. Error State
// ----------------------------------------------------------------------
export const ErrorState = ({ message, onRetry }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full flex flex-col items-center justify-center p-12 text-center bg-rose-50/50 rounded-2xl border border-rose-100"
  >
    <div className="w-12 h-12 rounded-full bg-rose-100 flex items-center justify-center mb-4">
      <AlertCircle className="w-6 h-6 text-rose-600" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">Something went wrong</h3>
    <p className="text-sm text-slate-500 mb-6 max-w-sm">{message || "We encountered an error loading this section. Please try again."}</p>
    {onRetry && (
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onRetry} 
        className="px-6 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-700 shadow-sm"
      >
        Retry
      </motion.button>
    )}
  </motion.div>
);

// ----------------------------------------------------------------------
// 12. Empty State
// ----------------------------------------------------------------------
export const EmptyState = ({ title, message, actionLabel, onAction }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    className="w-full flex flex-col items-center justify-center p-16 text-center bg-slate-50/50 rounded-2xl border border-slate-100 border-dashed"
  >
    <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-5">
      <PackageX className="w-8 h-8 text-slate-400" />
    </div>
    <h3 className="text-lg font-bold text-slate-900 mb-1">{title || "No results found"}</h3>
    <p className="text-sm text-slate-500 mb-6 max-w-sm">{message || "Try adjusting your filters or search terms to find what you're looking for."}</p>
    {actionLabel && onAction && (
      <motion.button 
        whileTap={{ scale: 0.95 }}
        onClick={onAction} 
        className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold shadow-md"
      >
        {actionLabel}
      </motion.button>
    )}
  </motion.div>
);
