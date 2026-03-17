import React, { useState, useEffect } from 'react';
import { Card, Button } from './ui/Base';
import { 
  TrendingUp, 
  TrendingDown, 
  Zap, 
  Activity, 
  Shield, 
  AlertCircle, 
  Search,
  ArrowUpRight,
  Filter,
  BrainCircuit,
  Target,
  ArrowRight,
  RefreshCw,
  Maximize2
} from 'lucide-react';
import axios from 'axios';
import { cn } from '../lib/utils';
import { TradingChart } from './TradingChart';
import { OrderBook } from './OrderBook';
import { generateTradingSignals, TradingSignal } from '../services/geminiService';

export const AISignals = () => {
  const [signals, setSignals] = useState<TradingSignal[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSignals = async () => {
    setLoading(true);
    const data = await generateTradingSignals();
    setSignals(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSignals();
  }, []);

  return (
    <Card className="p-0 bg-secondary/10 backdrop-blur-2xl border-white/5 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
            <BrainCircuit size={14} className="text-primary animate-pulse" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">AI Intelligence</h3>
        </div>
        <Button variant="ghost" size="sm" onClick={fetchSignals} disabled={loading} className="h-8 w-8 p-0 rounded-lg hover:bg-white/5">
          <RefreshCw size={14} className={cn(loading && "animate-spin")} />
        </Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        {loading ? (
          <div className="p-12 flex flex-col items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-[0.3em] animate-pulse">Analyzing Market Dynamics</span>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {signals.map((signal) => (
              <div key={signal.id} className="p-5 hover:bg-white/[0.02] transition-all group cursor-pointer relative overflow-hidden">
                <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-black font-mono tracking-tighter">{signal.asset}</span>
                    <span className={cn(
                      "text-[8px] font-black px-2 py-0.5 rounded-full border uppercase tracking-widest",
                      signal.type === 'BULLISH' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                      signal.type === 'BEARISH' ? "bg-red-500/10 text-red-500 border-red-500/20" :
                      "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}>
                      {signal.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-white/5 px-2 py-1 rounded-md">
                    <Target size={10} className="text-primary" />
                    <span className="text-[10px] font-mono font-bold text-foreground/70">{signal.confidence}%</span>
                  </div>
                </div>
                <p className="text-[11px] text-muted-foreground leading-relaxed mb-4 line-clamp-2 italic font-serif opacity-80 group-hover:opacity-100 transition-opacity">
                  {signal.reasoning}
                </p>
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-2 rounded-xl bg-white/[0.02] border border-white/5">
                    <div className="text-[7px] font-bold uppercase text-muted-foreground/60 tracking-widest mb-1">Entry</div>
                    <div className="text-[11px] font-mono font-bold">{signal.entry}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                    <div className="text-[7px] font-bold uppercase text-emerald-500/60 tracking-widest mb-1">Target</div>
                    <div className="text-[11px] font-mono font-bold text-emerald-500">{signal.target}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-red-500/5 border border-red-500/10">
                    <div className="text-[7px] font-bold uppercase text-red-500/60 tracking-widest mb-1">Stop</div>
                    <div className="text-[11px] font-mono font-bold text-red-500">{signal.stopLoss}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="p-4 bg-white/[0.02] border-t border-white/5">
        <Button variant="primary" size="sm" className="w-full h-10 text-[10px] uppercase tracking-[0.2em] font-black shadow-lg shadow-primary/20">
          Execute All Signals
        </Button>
      </div>
    </Card>
  );
};

export const MarketScanner = () => {
  const [opportunities, setOpportunities] = useState<any[]>([]);

  useEffect(() => {
    setOpportunities([
      { id: 1, type: 'Volume Spike', asset: 'PEPE', value: '+450%', time: '2m ago', confidence: 'High', action: 'Bullish' },
      { id: 2, type: 'Liquidity Added', asset: 'WIF/SOL', value: '$2.4M', time: '5m ago', confidence: 'Medium', action: 'Neutral' },
      { id: 3, type: 'Whale Buy', asset: 'LINK', value: '50k LINK', time: '12m ago', confidence: 'High', action: 'Bullish' },
      { id: 4, type: 'RSI Oversold', asset: 'ARB', value: '24.5', time: '18m ago', confidence: 'Medium', action: 'Reversal' },
    ]);
  }, []);

  return (
    <Card className="p-0 bg-secondary/10 backdrop-blur-2xl border-white/5 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
            <Activity size={14} className="text-accent" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">Market Scanner</h3>
        </div>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-lg hover:bg-white/5"><Filter size={14} /></Button>
      </div>
      
      <div className="flex-1 overflow-y-auto scrollbar-none">
        <div className="divide-y divide-white/5">
          {opportunities.map((op) => (
            <div key={op.id} className="p-4 hover:bg-white/[0.02] transition-all cursor-pointer group relative">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[8px] font-black text-primary uppercase tracking-[0.2em]">{op.type}</span>
                <span className="text-[9px] text-muted-foreground font-mono opacity-60">{op.time}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="font-black text-sm font-mono tracking-tighter">{op.asset}</span>
                  <span className={cn(
                    "text-[11px] font-bold font-mono",
                    op.action === 'Bullish' ? "text-emerald-500" : "text-muted-foreground"
                  )}>{op.value}</span>
                </div>
                <div className={cn(
                  "px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border",
                  op.confidence === 'High' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-orange-500/10 text-orange-500 border-orange-500/20"
                )}>
                  {op.confidence}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="p-4 bg-white/[0.02] border-t border-white/5">
        <Button variant="outline" size="sm" className="w-full h-10 text-[10px] uppercase tracking-[0.2em] font-black border-white/10 hover:bg-white/5">
          View All Signals
        </Button>
      </div>
    </Card>
  );
};

export const TradingDashboard = () => {
  return (
    <div className="pt-24 pb-6 px-6 h-screen flex flex-col gap-6 overflow-hidden bg-background">
      {/* Top Stats Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-px bg-white/5 border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        {[
          { label: 'BTC/USDT', value: '65,432.10', change: '+2.45%', color: 'text-emerald-500' },
          { label: 'ETH/USDT', value: '3,456.78', change: '-1.20%', color: 'text-red-500' },
          { label: 'SOL/USDT', value: '145.20', change: '+5.70%', color: 'text-emerald-500' },
          { label: '24h Volume', value: '$84.2B', change: '+12.4%', color: 'text-emerald-500' },
          { label: 'Market Cap', value: '$2.45T', change: '+1.8%', color: 'text-emerald-500' },
          { label: 'Fear & Greed', value: '72', change: 'Greed', color: 'text-orange-500' },
        ].map((stat, i) => (
          <div key={i} className="p-5 flex items-center justify-between bg-secondary/10 hover:bg-white/[0.03] transition-all group cursor-default">
            <div>
              <div className="text-[8px] text-muted-foreground uppercase tracking-[0.25em] mb-2 font-bold">{stat.label}</div>
              <div className="text-base font-black font-mono tracking-tighter group-hover:text-primary transition-colors">{stat.value}</div>
            </div>
            <div className={cn("text-[10px] font-black font-mono bg-white/5 px-2 py-1 rounded-md", stat.color)}>{stat.change}</div>
          </div>
        ))}
      </div>

      {/* Main Trading Area */}
      <div className="flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Left: Scanner & Signals */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <div className="flex-[1.5] min-h-0">
            <AISignals />
          </div>
          <div className="flex-1 min-h-0">
            <MarketScanner />
          </div>
        </div>

        {/* Center: Chart & Bots */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-6 overflow-hidden">
          <div className="flex-[2] min-h-0">
            <TradingChart />
          </div>
          <div className="flex-1 min-h-0">
            <Card className="p-0 h-full bg-secondary/10 backdrop-blur-2xl border-white/5 flex flex-col overflow-hidden">
              <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
                    <Zap size={14} className="text-primary" />
                  </div>
                  <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">Active Trading Bots</h3>
                </div>
                <Button variant="ghost" size="sm" className="text-primary text-[9px] font-black uppercase tracking-[0.2em] rounded-lg hover:bg-white/5 px-3">Manage Terminal</Button>
              </div>
              <div className="flex-1 overflow-y-auto divide-y divide-white/5 scrollbar-none">
                {[
                  { name: 'BTC Scalper', pnl: '+$1,240', status: 'Active', winRate: '68%', risk: 'Low' },
                  { name: 'ETH Momentum', pnl: '+$450', status: 'Active', winRate: '55%', risk: 'Med' },
                  { name: 'SOL Swing', pnl: '-$120', status: 'Paused', winRate: '42%', risk: 'High' },
                ].map((bot, i) => (
                  <div key={i} className="flex items-center justify-between p-5 hover:bg-white/[0.02] transition-all group cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-2.5 h-2.5 rounded-full",
                        bot.status === 'Active' ? "bg-emerald-500 shadow-[0_0_12px_rgba(16,185,129,0.5)] animate-pulse" : "bg-orange-500"
                      )} />
                      <div>
                        <div className="text-sm font-black font-mono tracking-tighter">{bot.name}</div>
                        <div className="text-[8px] font-bold uppercase tracking-widest text-muted-foreground mt-0.5">Risk: {bot.risk}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <div className="text-[8px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">P&L</div>
                        <div className={cn("text-xs font-black font-mono", bot.pnl.startsWith('+') ? "text-emerald-500" : "text-red-500")}>{bot.pnl}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-[8px] text-muted-foreground uppercase tracking-[0.2em] mb-1 font-bold">Win Rate</div>
                        <div className="text-xs font-black font-mono text-foreground/80">{bot.winRate}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Right: Order Book & Trade History */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-6 overflow-hidden">
          <div className="flex-[1.5] min-h-0">
            <OrderBook />
          </div>
          <div className="flex-1 min-h-0">
             <Card className="p-0 h-full bg-secondary/10 backdrop-blur-2xl border-white/5 flex flex-col overflow-hidden">
                <div className="p-4 border-b border-white/5 bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-lg bg-accent/20 flex items-center justify-center">
                      <Activity size={14} className="text-accent" />
                    </div>
                    <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">Recent Trades</h3>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto scrollbar-none">
                  <div className="grid grid-cols-3 px-5 py-3 border-b border-white/5 text-[8px] uppercase text-muted-foreground font-black tracking-[0.2em] bg-white/[0.01]">
                    <span>Price</span>
                    <span className="text-right">Size</span>
                    <span className="text-right">Time</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {[...Array(15)].map((_, i) => (
                      <div key={i} className="grid grid-cols-3 px-5 py-2.5 text-[10px] font-mono hover:bg-white/[0.02] transition-colors group">
                        <span className={cn("font-bold", i % 3 === 0 ? "text-red-500" : "text-emerald-500")}>65,432.10</span>
                        <span className="text-right text-foreground/70 font-medium">0.0245</span>
                        <span className="text-right text-muted-foreground/50 group-hover:text-muted-foreground transition-colors">14:24:05</span>
                      </div>
                    ))}
                  </div>
                </div>
             </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
