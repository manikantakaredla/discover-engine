import React from 'react';
import { 
  TrendingUp, MousePointerClick, ShoppingCart, DollarSign, 
  Clock, Sparkles, UserPlus, Layers, CreditCard, PieChart, BarChart3, LineChart
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Dummy Data ---
const METRICS = [
  { label: "Click-Through Rate", value: "24.8%", trend: "+2.1%", isGood: true, icon: MousePointerClick },
  { label: "Conversion Rate", value: "12.4%", trend: "+1.2%", isGood: true, icon: ShoppingCart },
  { label: "Average Order Value", value: "₹4,250", trend: "+₹350", isGood: true, icon: DollarSign },
  { label: "Cold Start Success", value: "88.2%", trend: "+5.4%", isGood: true, icon: UserPlus },
  { label: "Feed Quality Score", value: "94/100", trend: "+1", isGood: true, icon: Sparkles },
  { label: "Diversity Score", value: "96%", trend: "-2%", isGood: false, icon: Layers },
  { label: "Avg Latency", value: "42ms", trend: "-4ms", isGood: true, icon: Clock },
  { label: "Cost Per Req", value: "₹0.12", trend: "-₹0.01", isGood: true, icon: CreditCard },
];

const TREND_DATA_1 = [30, 45, 40, 60, 50, 75, 65, 85, 80, 95, 90, 110];
const TREND_DATA_2 = [20, 25, 22, 35, 30, 45, 40, 55, 50, 65, 60, 80];

const CATEGORIES = [
  { name: "Running Shoes", value: 85 },
  { name: "Activewear", value: 65 },
  { name: "Accessories", value: 45 },
  { name: "Electronics", value: 30 },
];

const INTENTS = [
  { name: "Fitness Journey", value: 42, color: "bg-indigo-500" },
  { name: "Casual Comfort", value: 28, color: "bg-blue-400" },
  { name: "Gift Shopping", value: 18, color: "bg-sky-300" },
  { name: "Price Comparison", value: 12, color: "bg-slate-200" },
];

// --- Sub Components ---

const MetricCard = ({ label, value, trend, isGood, icon: Icon }) => (
  <div className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-all">
    <div className="flex items-center gap-2 mb-3">
      <Icon className="w-4 h-4 text-slate-400" />
      <h3 className="text-sm font-medium text-slate-500">{label}</h3>
    </div>
    <div className="flex items-end justify-between mt-auto">
      <span className="text-2xl font-bold text-slate-900 tracking-tight">{value}</span>
      <span className={cn(
        "text-xs font-semibold px-2 py-1 rounded-md",
        isGood ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
      )}>
        {trend}
      </span>
    </div>
  </div>
);

// Simple SVG Line Chart to mimic Stripe's smooth graphs
const SmoothLineChart = ({ data, colorClass = "stroke-indigo-500", fillClass = "fill-indigo-50" }) => {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;
  
  // Create SVG path
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * 100;
    const y = 100 - (((val - min) / range) * 100);
    return `${x},${y}`;
  });

  const pathD = `M 0,${100 - (((data[0] - min) / range) * 100)} ` + 
    points.map((p, i) => {
      if (i === 0) return '';
      const [prevX, prevY] = points[i-1].split(',');
      const [currX, currY] = p.split(',');
      // Smooth cubic bezier calculation (very simple approximation)
      const cp1X = parseFloat(prevX) + (parseFloat(currX) - parseFloat(prevX)) / 2;
      return `C ${cp1X},${prevY} ${cp1X},${currY} ${currX},${currY}`;
    }).join(' ');

  const areaD = `${pathD} L 100,100 L 0,100 Z`;

  return (
    <div className="w-full h-48 relative mt-4">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map(y => (
          <line key={y} x1="0" y1={y} x2="100" y2={y} stroke="#f1f5f9" strokeWidth="0.5" vectorEffect="non-scaling-stroke" />
        ))}
        {/* Area fill */}
        <path d={areaD} className={cn("opacity-50", fillClass)} vectorEffect="non-scaling-stroke" />
        {/* Line */}
        <path d={pathD} fill="none" className={cn("stroke-2", colorClass)} vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

const HorizontalBarChart = ({ data }) => (
  <div className="flex flex-col gap-4 mt-6">
    {data.map((item, i) => (
      <div key={i} className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-sm">
          <span className="font-medium text-slate-700">{item.name}</span>
          <span className="font-semibold text-slate-900">{item.value}%</span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-slate-800 rounded-full" 
            style={{ width: `${item.value}%` }} 
          />
        </div>
      </div>
    ))}
  </div>
);

import { useEffect, useState } from 'react';
import { apiClient } from './api/client.js';

// --- Main Page ---
export default function KpiDashboard() {
  const [metricsData, setMetricsData] = useState({
    metrics: METRICS,
    categories: CATEGORIES,
    intents: INTENTS
  });

  useEffect(() => {
    const fetchKPIs = async () => {
      const data = await apiClient.get('/analytics/kpi');
      if (data) {
        // Map backend metrics string labels to icons
        const iconMap = {
          "Click-Through Rate": MousePointerClick,
          "Conversion Rate": ShoppingCart,
          "Average Order Value": DollarSign,
          "Total Views": UserPlus,
          "Feed Quality Score": Sparkles,
          "Total Clicks": MousePointerClick,
          "Total Purchases": ShoppingCart,
          "Total Searches": Search
        };
        const mappedMetrics = data.metrics.map(m => ({ ...m, icon: iconMap[m.label] || Sparkles }));
        setMetricsData({
          metrics: mappedMetrics,
          categories: data.categories,
          intents: data.intents
        });
      }
    };
    fetchKPIs();
    const interval = setInterval(fetchKPIs, 2000); // Fast polling for real-time feel
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F6F9FC] font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* HEADER (Stripe Style) */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-indigo-600 rounded flex items-center justify-center shadow-md shadow-indigo-600/20">
                <TrendingUp className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="font-bold text-slate-900 tracking-tight">Business KPIs</span>
            </div>
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
              <a href="#kpi" className="px-3 py-1.5 rounded-md bg-slate-100 text-slate-900">Today</a>
              <a href="#kpi" className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">7d</a>
              <a href="#kpi" className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">4w</a>
              <a href="#kpi" className="px-3 py-1.5 rounded-md text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors">12m</a>
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 text-sm font-semibold bg-white border border-slate-200 text-slate-700 rounded-lg shadow-sm hover:bg-slate-50 transition-all">
              Export Report
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-6 lg:px-8 py-8 pb-24">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Performance Overview</h1>
          <p className="text-sm text-slate-500 mt-1">Real-time metrics for Discover Engine's personalization layer.</p>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {metricsData.metrics.map((metric, idx) => (
            <MetricCard key={idx} {...metric} />
          ))}
        </div>

        {/* CHARTS ROW 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Recommendation Impact</h3>
                <p className="text-sm text-slate-500">Revenue generated via AI feeds vs organic search.</p>
              </div>
              <LineChart className="w-5 h-5 text-slate-400" />
            </div>
            
            <div className="flex items-center gap-6 mt-4 mb-2">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-sm font-semibold text-slate-700">AI Feed (₹42L)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-sky-300" />
                <span className="text-sm font-semibold text-slate-700">Organic (₹18L)</span>
              </div>
            </div>

            <div className="relative">
              <SmoothLineChart data={TREND_DATA_1} colorClass="stroke-indigo-500" fillClass="fill-indigo-50" />
              <div className="absolute inset-0 pointer-events-none">
                <SmoothLineChart data={TREND_DATA_2} colorClass="stroke-sky-400" fillClass="fill-sky-50 opacity-30" />
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-base font-bold text-slate-900">Semantic Search Volume</h3>
                <p className="text-sm text-slate-500">Number of complex natural language queries processed.</p>
              </div>
              <BarChart3 className="w-5 h-5 text-slate-400" />
            </div>
            <div className="mt-4">
              <span className="text-3xl font-bold tracking-tight text-slate-900">12,492</span>
              <span className="text-sm font-medium text-emerald-600 ml-2">↑ 14% vs yesterday</span>
            </div>
            
            {/* Simple CSS Bar Chart */}
            <div className="flex items-end justify-between h-36 w-full mt-8 gap-2">
              {[40, 60, 45, 80, 55, 90, 75, 100, 85, 65, 70, 95].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end group">
                  <div 
                    className="w-full bg-slate-100 group-hover:bg-indigo-500 rounded-t-sm transition-colors relative"
                    style={{ height: `${val}%` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] py-1 px-2 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      {val * 12}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* CHARTS ROW 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6 lg:col-span-2">
            <h3 className="text-base font-bold text-slate-900 mb-1">Most Detected Intents</h3>
            <p className="text-sm text-slate-500 mb-6">Distribution of user shopping goals across all active sessions.</p>
            
            <div className="flex items-center gap-8">
              {/* CSS Donut Chart Approximation */}
              <div className="relative w-40 h-40 shrink-0 hidden sm:block">
                <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#e2e8f0" strokeWidth="20" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#6366f1" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.42)} />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#60a5fa" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.28)} transform="rotate(151.2 50 50)" />
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#7dd3fc" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.18)} transform="rotate(252 50 50)" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <PieChart className="w-6 h-6 text-slate-400" />
                </div>
              </div>
              
              <div className="flex-1 flex flex-col gap-3 w-full">
                {metricsData.intents.map((intent, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn("w-3 h-3 rounded-full shadow-sm", intent.color || "bg-indigo-500")} />
                      <span className="text-sm font-medium text-slate-700">{intent.name}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-900">{intent.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] p-6">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-base font-bold text-slate-900">Popular Categories</h3>
            </div>
            <p className="text-sm text-slate-500 mb-2">By conversion rate.</p>
            <HorizontalBarChart data={metricsData.categories} />
          </div>

        </div>

      </main>
    </div>
  );
}
