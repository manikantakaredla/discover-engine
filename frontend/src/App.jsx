import React, { useState } from 'react';
import { ShoppingBag, ChevronRight, Mail, Lock, Loader2, Sparkles, Zap, ShieldCheck } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// --- Utility for Tailwind ---
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Minimal UI Components imitating shadcn/ui ---
const Button = React.forwardRef(({ className, variant = "default", size = "default", isLoading, children, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:pointer-events-none disabled:opacity-50";
  const variants = {
    default: "bg-blue-600 text-white shadow hover:bg-blue-600/90",
    outline: "border border-slate-200 bg-white shadow-sm hover:bg-slate-100 hover:text-slate-900",
    ghost: "hover:bg-slate-100 hover:text-slate-900",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-8 rounded-md px-3 text-xs",
    lg: "h-12 rounded-md px-8",
    icon: "h-9 w-9",
  };
  
  return (
    <button
      ref={ref}
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
});
Button.displayName = "Button";

const Input = React.forwardRef(({ className, type, icon: Icon, ...props }, ref) => {
  return (
    <div className="relative">
      {Icon && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          <Icon className="h-4 w-4" />
        </div>
      )}
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-slate-200 bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
          Icon && "pl-9",
          className
        )}
        ref={ref}
        {...props}
      />
    </div>
  );
});
Input.displayName = "Input";

const Checkbox = React.forwardRef(({ className, ...props }, ref) => (
  <input
    type="checkbox"
    ref={ref}
    className={cn(
      "peer h-4 w-4 shrink-0 rounded-sm border border-slate-200 shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white accent-blue-600",
      className
    )}
    {...props}
  />
));
Checkbox.displayName = "Checkbox";

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={cn("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70", className)}
    {...props}
  />
));
Label.displayName = "Label";

// --- Main Login Page Component ---
export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    window.location.hash = '#home';
  };

  const handleDemoLogin = async () => {
    setIsDemoLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsDemoLoading(false);
    window.location.hash = '#home';
  };

  return (
    <div className="min-h-screen w-full bg-[#F8FAFC] flex font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* LEFT SIDE - BRANDING (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 bg-white flex-col justify-between p-12 border-r border-slate-100 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-50/50 blur-3xl pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] rounded-full bg-indigo-50/50 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900">Discover Engine</span>
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 tracking-tight mb-6 leading-[1.1]">
            Personalized <span className="text-blue-600">Shopping</span> Discovery.
          </h1>
          <p className="text-lg text-slate-500 mb-10 leading-relaxed font-medium">
            The next-generation AI intent engine. Empower your commerce with semantic search, guardrails, and deterministic enterprise intelligence.
          </p>

          {/* Abstract Feature Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Semantic Retrieval</h3>
                <p className="text-xs text-slate-500 mt-1">Multi-intent vector matching.</p>
              </div>
            </div>
            
            <div className="bg-slate-50 border border-slate-100 p-5 rounded-2xl flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-8 h-8 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 text-sm">Enterprise Guardrails</h3>
                <p className="text-xs text-slate-500 mt-1">Policy & DPDP compliant.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-sm text-slate-400 font-medium">
          <span>© 2026 Discover Engine. All rights reserved.</span>
        </div>
      </div>

      {/* RIGHT SIDE - LOGIN FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px] bg-white rounded-[24px] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 p-8 sm:p-10 transition-all">
          
          {/* Mobile Header (Only visible on small screens) */}
          <div className="flex lg:hidden items-center justify-center gap-3 mb-8">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600 text-white shadow-md shadow-blue-600/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">Discover Engine</span>
          </div>

          <div className="flex flex-col space-y-2 text-center mb-8">
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900">Welcome back</h2>
            <p className="text-sm text-slate-500">
              Enter your credentials to access the admin dashboard
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700">Email address</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="admin@discoverengine.ai" 
                  icon={Mail} 
                  required 
                  autoComplete="email"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-slate-700">Password</Label>
                  <a href="#" className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                    Forgot password?
                  </a>
                </div>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  icon={Lock} 
                  required 
                  autoComplete="current-password"
                />
              </div>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <Checkbox id="remember" />
              <Label htmlFor="remember" className="text-sm font-normal text-slate-600 cursor-pointer">
                Remember me for 30 days
              </Label>
            </div>

            <Button type="submit" className="w-full text-base font-semibold" size="lg" isLoading={isLoading}>
              Sign in
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-200" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-3 text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          <Button 
            variant="outline" 
            type="button" 
            className="w-full text-base font-medium h-12" 
            onClick={handleDemoLogin}
            isLoading={isDemoLoading}
          >
            {!isDemoLoading && <Zap className="mr-2 h-4 w-4 text-blue-600" />}
            Demo Login
          </Button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Don't have an account?{' '}
            <a href="#" className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">
              Contact Sales
            </a>
          </p>
        </div>
      </div>

    </div>
  );
}
