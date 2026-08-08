import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2, ShieldCheck, CreditCard, MapPin } from 'lucide-react';
import { Button, Input } from './components/index.jsx';
import { apiClient } from './api/client.js';

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    try {
      const items = JSON.parse(localStorage.getItem('discover_cart') || '[]');
      setCartItems(items);
      const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      setTotal(subtotal + (subtotal * 0.18));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleCheckout = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment gateway delay
    await new Promise(r => setTimeout(r, 2000));
    
    // Fire analytics event for backend KPIs
    try {
      for (const item of cartItems) {
        // Fire individual purchase events so the analytics engine correctly tracks CVR per product
        await apiClient.post('/analytics/track', { 
            eventType: 'purchase', 
            productId: item._id,
            metadata: { quantity: item.quantity, price: item.price } 
        });
      }
    } catch (err) {
      console.error("Failed to track purchase:", err);
    }
    
    // Clear cart
    localStorage.removeItem('discover_cart');
    window.dispatchEvent(new Event('cart-updated'));
    
    setIsProcessing(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-50 font-sans flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center border border-slate-200 shadow-sm animate-in fade-in zoom-in duration-300">
          <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Order Confirmed!</h1>
          <p className="text-slate-500 mb-8">Thank you for your purchase. We've sent a confirmation email with your order details.</p>
          <Button onClick={() => window.location.hash = '#home'} className="w-full">
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 h-16 flex items-center gap-4">
          <button 
            onClick={() => window.history.back()}
            className="p-2 -ml-2 rounded-full hover:bg-slate-100 text-slate-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">Secure Checkout</h1>
          <div className="ml-auto flex items-center gap-2 text-green-600 text-sm font-semibold">
            <ShieldCheck className="w-4 h-4" />
            256-bit Encrypted
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleCheckout} className="space-y-8">
          {/* Shipping Section */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Shipping Address
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">First Name</label>
                <Input required placeholder="John" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Last Name</label>
                <Input required placeholder="Doe" />
              </div>
              <div className="sm:col-span-2 space-y-1">
                <label className="text-sm font-medium text-slate-700">Address Line 1</label>
                <Input required placeholder="123 Discovery Lane" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">City</label>
                <Input required placeholder="Mumbai" />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Pincode</label>
                <Input required placeholder="400001" />
              </div>
            </div>
          </section>

          {/* Payment Section */}
          <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-blue-600" />
              Payment Information
            </h2>
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-slate-700">Card Number</label>
                <Input required placeholder="4111 1111 1111 1111" maxLength="19" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">Expiry</label>
                  <Input required placeholder="MM/YY" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-slate-700">CVV</label>
                  <Input required placeholder="123" type="password" maxLength="4" />
                </div>
              </div>
            </div>
          </section>
          
          <Button 
            type="submit" 
            className="w-full text-lg h-14 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-200"
            isLoading={isProcessing}
          >
            {isProcessing ? "Processing Payment..." : `Pay ₹${total.toFixed(2)}`}
          </Button>
        </form>
      </main>
    </div>
  );
}
