import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import LoginPage from './App.jsx'
import HomePage from './HomePage.jsx'
import ProductDetailsPage from './ProductDetails.jsx'

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
      </div>

      {currentPath === '#home' ? <HomePage /> 
        : currentPath === '#product' ? <ProductDetailsPage /> 
        : <LoginPage />}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)
