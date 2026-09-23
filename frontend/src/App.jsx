import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Coins, 
  Bot, 
  TrendingUp, 
  CheckCircle2, 
  Activity, 
  Database,
  ArrowRight,
  Sparkles
} from 'lucide-react';

function App() {
  const [healthStatus, setHealthStatus] = useState({
    loading: true,
    connected: false,
    data: null,
    error: null,
  });

  useEffect(() => {
    fetchHealth();
  }, []);

  const fetchHealth = async () => {
    setHealthStatus(prev => ({ ...prev, loading: true, error: null }));
    try {
      const res = await fetch('/health');
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      setHealthStatus({
        loading: false,
        connected: true,
        data,
        error: null,
      });
    } catch (err) {
      setHealthStatus({
        loading: false,
        connected: false,
        data: null,
        error: err.message,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col">
      {/* Top Navbar */}
      <header className="border-b border-slate-800 bg-[#0f172a]/80 backdrop-blur sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <Coins className="w-5 h-5 text-slate-950 font-bold" />
            </div>
            <div>
              <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                GigWealth-Lite
              </span>
              <span className="ml-2 text-xs font-medium px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                ArthSetu PS-02
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-xs px-3 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700">
              <Activity className={`w-3.5 h-3.5 ${healthStatus.connected ? 'text-emerald-400 animate-pulse' : 'text-amber-400'}`} />
              <span className="text-slate-300 font-medium">
                Backend: {healthStatus.loading ? 'Checking...' : healthStatus.connected ? 'Online (200 OK)' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-4 sm:px-6 py-10 w-full">
        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Phase 1 Scaffolding Complete</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            Micro-Investment & Savings for{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Gig Workers
            </span>
          </h1>
          <p className="text-slate-400 text-base sm:text-lg">
            An intelligent, autonomous financial co-pilot tailored for workers with irregular income.
            Transforming raw platform payouts into disciplined savings, tax readiness, and smart investments.
          </p>
        </div>

        {/* System Diagnostics / Phase 1 Status Card */}
        <div className="bg-slate-800/40 border border-slate-700/80 rounded-2xl p-6 mb-10 shadow-xl backdrop-blur">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-700/60">
            <h2 className="text-lg font-bold text-white flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <span>Phase 1 Architecture Status</span>
            </h2>
            <button
              onClick={fetchHealth}
              className="text-xs px-3 py-1 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 transition"
            >
              Re-check Health
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Backend Server
              </div>
              <div className="text-sm font-bold text-emerald-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                <span>Express API ({healthStatus.connected ? 'Port 5000' : 'Checking'})</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Route: <code className="text-slate-300">GET /health</code> returned HTTP 200
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Database Client
              </div>
              <div className="text-sm font-bold text-teal-400 flex items-center space-x-2">
                <Database className="w-3.5 h-3.5 text-teal-400" />
                <span>Supabase Ready</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Status: {healthStatus.data?.supabase?.status || 'Client configured with env vars'}
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-700/50">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Frontend UI
              </div>
              <div className="text-sm font-bold text-cyan-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                <span>React + Vite + Tailwind</span>
              </div>
              <p className="text-xs text-slate-400 mt-2">
                Proxy active: <code className="text-slate-300">/api & /health</code>
              </p>
            </div>
          </div>

          {healthStatus.data && (
            <div className="mt-4 p-3 rounded-lg bg-slate-950/70 text-xs font-mono text-slate-300 overflow-x-auto border border-slate-800">
              <div className="text-slate-500 mb-1">// GET /health live response</div>
              {JSON.stringify(healthStatus.data, null, 2)}
            </div>
          )}
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/60 hover:border-emerald-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">Deterministic Math</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              No LLM hallucinations on finances. Every rupee calculated by pure, verifiable rule engines and mathematical formulas.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/60 hover:border-teal-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">DPDP 2023 Compliant</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Zero storage of bank credentials, PINs, or OTPs. Transparent consent gates prior to ingesting any financial data.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-gradient-to-b from-slate-800/60 to-slate-900/60 border border-slate-700/60 hover:border-cyan-500/40 transition">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center mb-4">
              <Bot className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-white mb-2">Tool-Calling AI Agent</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Conversational advisor driven by OpenRouter tool-calling. Interprets cash flows, answers what-if questions, and guides action.
            </p>
          </div>
        </div>

        {/* Phase Roadmap Footer */}
        <div className="text-center text-xs text-slate-500 pt-6 border-t border-slate-800">
          GigWealth-Lite &bull; Built phase-by-phase for Hackathon MVP &bull; Ready for Phase 2: Database Schema
        </div>
      </main>
    </div>
  );
}

export default App;
