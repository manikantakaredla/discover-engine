import React from 'react';
import { 
  Activity, Zap, Shield, Target, Database, Clock, 
  ArrowRight, Search, Server, Cpu, CheckCircle2, AlertCircle
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// --- Dummy Data ---
const METRICS = {
  intent: "Fitness Journey",
  strategy: "Semantic Retrieval",
  feedQuality: 94,
  latency: 42,
  cacheHit: 88,
  confidence: 96,
};

const LATENCY_DATA = [
  42, 45, 38, 51, 40, 42, 39, 44, 41, 46, 38, 42, 40, 48, 41, 43, 39, 42
];

const PIPELINE_NODES = [
  { id: 'session', label: 'Session', status: 'success', time: '2ms', icon: UserIcon },
  { id: 'intent', label: 'Intent Extraction', status: 'success', time: '14ms', icon: Target },
  { id: 'retrieval', label: 'Vector Retrieval', status: 'success', time: '18ms', icon: Search },
  { id: 'ranking', label: 'Reranking', status: 'success', time: '8ms', icon: Activity },
  { id: 'guardrails', label: 'Guardrails (DPDP)', status: 'success', time: '3ms', icon: Shield },
  { id: 'feed', label: 'Feed Builder', status: 'success', time: '2ms', icon: Server },
  { id: 'discovery', label: 'Discovery Feed', status: 'active', time: '-', icon: Zap },
];

function UserIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// --- Components ---

const MetricCard = ({ title, value, unit, trend, trendValue, icon: Icon, isGood = true }) => (
  <div className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between mb-4">
      <h3 className="text-sm font-medium text-slate-500">{title}</h3>
      <Icon className="w-4 h-4 text-slate-400" />
    </div>
    <div className="flex items-baseline gap-1">
      <span className="text-2xl font-semibold tracking-tight text-slate-900">{value}</span>
      {unit && <span className="text-sm font-medium text-slate-500">{unit}</span>}
    </div>
    {trendValue && (
      <div className="mt-3 flex items-center gap-1.5 text-xs font-medium">
        <span className={cn(
          "flex items-center gap-0.5",
          isGood ? "text-emerald-600" : "text-amber-600"
        )}>
          {trend === 'up' ? '↑' : '↓'} {trendValue}
        </span>
        <span className="text-slate-400">vs last hour</span>
      </div>
    )}
  </div>
);

const PipelineVisualization = () => (
  <div className="w-full bg-white border border-slate-200 rounded-xl shadow-sm p-6 overflow-x-auto">
    <div className="flex items-center justify-between mb-6">
      <h3 className="text-sm font-semibold text-slate-900">Live Execution Trace</h3>
      <div className="flex items-center gap-4 text-xs font-medium text-slate-500">
        <span className="flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> Success</span>
        <span className="flex items-center gap-1"><div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Processing</span>
      </div>
    </div>
    
    <div className="min-w-[800px] py-4">
      <div className="flex items-center justify-between relative">
        {/* Connecting Line */}
        <div className="absolute left-6 right-6 top-6 h-[2px] bg-slate-100 -z-10" />
        
        {PIPELINE_NODES.map((node, idx) => {
          const isActive = node.status === 'active';
          return (
            <div key={node.id} className="flex flex-col items-center relative group">
              {/* Connecting line progress fill */}
              {idx > 0 && node.status === 'success' && (
                <div className="absolute right-[50%] top-6 h-[2px] w-full bg-emerald-500 -z-10" />
              )}
              {idx > 0 && isActive && (
                <div className="absolute right-[50%] top-6 h-[2px] w-full bg-gradient-to-r from-emerald-500 to-blue-500 -z-10" />
              )}

              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center bg-white border-2 transition-all duration-300",
                node.status === 'success' ? "border-emerald-500 text-emerald-500" :
                isActive ? "border-blue-500 text-blue-600 shadow-[0_0_0_4px_rgba(59,130,246,0.1)]" :
                "border-slate-200 text-slate-400"
              )}>
                <node.icon className="w-5 h-5" />
              </div>
              
              <div className="mt-4 flex flex-col items-center text-center">
                <span className={cn(
                  "text-xs font-semibold whitespace-nowrap",
                  isActive ? "text-slate-900" : "text-slate-600"
                )}>
                  {node.label}
                </span>
                <span className="text-[10px] font-mono text-slate-400 mt-1">{node.time}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </div>
);

const MiniBarChart = ({ data }) => {
  const max = Math.max(...data);
  return (
    <div className="flex items-end gap-1 h-12 w-full mt-4">
      {data.map((val, i) => (
        <div 
          key={i} 
          className="flex-1 bg-blue-100 hover:bg-blue-600 transition-colors rounded-t-sm"
          style={{ height: `${(val / max) * 100}%` }}
        />
      ))}
    </div>
  );
};

// --- Main Page ---
export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-slate-900">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-slate-900 text-white rounded flex items-center justify-center">
              <Cpu className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">AI Workflow</span>
            <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-bold tracking-widest uppercase ml-2">Live</span>
          </div>
          <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
            <a href="#admin" className="hover:text-slate-900 transition-colors">Overview</a>
            <a href="#admin" className="hover:text-slate-900 transition-colors">Metrics</a>
            <a href="#admin" className="text-slate-900 transition-colors">Traces</a>
            <a href="#admin" className="hover:text-slate-900 transition-colors">Logs</a>
          </div>
        </div>
      </header>

      <main className="max-w-[1200px] mx-auto px-6 py-8 pb-24">
        
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 mb-1">Execution Trace</h1>
            <p className="text-sm text-slate-500">Req ID: <span className="font-mono text-slate-400">req_8f72c91b4a</span> • Just now</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white border border-slate-200 rounded-md text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm">
              Export Trace
            </button>
          </div>
        </div>

        {/* METRICS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          <MetricCard 
            title="Current Intent" 
            value={METRICS.intent} 
            icon={Target} 
          />
          <MetricCard 
            title="Active Strategy" 
            value={METRICS.strategy} 
            icon={Activity} 
          />
          <MetricCard 
            title="AI Confidence" 
            value={METRICS.confidence} 
            unit="%"
            icon={CheckCircle2} 
            trend="up"
            trendValue="2.1%"
          />
          
          <div className="flex flex-col p-5 bg-white border border-slate-200 rounded-xl shadow-sm lg:col-span-1">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-slate-500">Pipeline Latency</h3>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-semibold tracking-tight text-slate-900 font-mono">{METRICS.latency}</span>
              <span className="text-sm font-medium text-slate-500 font-mono">ms</span>
            </div>
            <MiniBarChart data={LATENCY_DATA} />
          </div>

          <MetricCard 
            title="Feed Quality Score" 
            value={METRICS.feedQuality}
            unit="/ 100" 
            icon={Sparkles} 
            trend="up"
            trendValue="1.4"
          />
          <MetricCard 
            title="Cache Hit Rate" 
            value={METRICS.cacheHit} 
            unit="%"
            icon={Database} 
            trend="down"
            trendValue="4.2%"
            isGood={false}
          />
        </div>

        {/* PIPELINE VISUALIZATION */}
        <div className="mb-6">
          <PipelineVisualization />
        </div>

        {/* DETAILED LOGS / GUARDRAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold text-slate-900">Guardrail Engine</h3>
              <Shield className="w-4 h-4 text-slate-400" />
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">Policy Validation</span>
                </div>
                <span className="text-xs font-mono text-slate-400">1ms</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">Diversity Check (≤35%)</span>
                </div>
                <span className="text-xs font-mono text-slate-400">1ms</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-slate-50">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span className="text-sm text-slate-600">Duplicates Removed</span>
                </div>
                <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">3 Items</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm text-slate-600">Explainability Validated</span>
                </div>
                <span className="text-xs font-mono text-slate-400">&lt;1ms</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-xl shadow-sm p-6 text-slate-300 font-mono text-xs overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-4">
              <span className="text-slate-400 font-sans text-sm font-semibold">Raw JSON Trace</span>
              <button className="text-slate-500 hover:text-white transition-colors">Copy</button>
            </div>
            <pre className="flex-1 overflow-y-auto hide-scrollbar">
{`{
  "traceId": "req_8f72c91b4a",
  "timestamp": "2026-08-08T00:23:45Z",
  "intent": {
    "detected": "Fitness Journey",
    "confidence": 0.96,
    "source": "hybrid_rule_engine"
  },
  "retrieval": {
    "candidates": 142,
    "vectorLatency": "18ms"
  },
  "guardrails": {
    "passed": true,
    "diversityScore": 94
  },
  "finalCount": 24
}`}
            </pre>
          </div>
          
        </div>

      </main>
    </div>
  );
}
