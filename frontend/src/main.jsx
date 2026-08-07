import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './App.jsx'
import HomePage from './HomePage.jsx'
import ProductDetailsPage from './ProductDetails.jsx'
import SearchResultsPage from './SearchResults.jsx'
import AdminDashboard from './AdminDashboard.jsx'
import KpiDashboard from './KpiDashboard.jsx'

import { AnimatePresence, motion } from 'framer-motion'

function Root() {
  const [currentPath, setCurrentPath] = useState(window.location.hash || '#login');

  window.addEventListener('hashchange', () => {
    setCurrentPath(window.location.hash);
  });

  return (
    <>
      <div className="fixed bottom-4 right-4 z-[9999] bg-white shadow-xl rounded-full px-4 py-2 flex gap-4 text-xs font-bold border border-slate-200">
        <a href="#login" className="text-slate-500 hover:text-blue-600">Login</a>
        <a href="#home" className="text-slate-500 hover:text-blue-600">Home</a>
        <a href="#product" className="text-slate-500 hover:text-blue-600">Product</a>
        <a href="#search" className="text-slate-500 hover:text-blue-600">Search</a>
        <a href="#admin" className="text-slate-500 hover:text-blue-600">Admin</a>
        <a href="#kpi" className="text-slate-500 hover:text-blue-600">KPIs</a>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentPath}
          initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -10, filter: 'blur(4px)' }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="min-h-screen"
        >
          {currentPath.split('?')[0] === '#home' ? <HomePage /> 
            : currentPath.split('?')[0] === '#product' ? <ProductDetailsPage /> 
            : currentPath.split('?')[0] === '#search' ? <SearchResultsPage /> 
            : currentPath.split('?')[0] === '#admin' ? <AdminDashboard /> 
            : currentPath.split('?')[0] === '#kpi' ? <KpiDashboard /> 
            : <LoginPage />}
        </motion.div>
      </AnimatePresence>
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
