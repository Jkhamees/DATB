import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Square, Plus, Settings, TrendingUp, Shield, Zap, Activity, Filter } from 'lucide-react';
import { Card, Button } from './ui/Base';
import axios from 'axios';
import { cn } from '../lib/utils';

export const TradingBotHub = () => {
  const [bots, setBots] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const res = await axios.get('/api/bots/status');
        setBots(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBots();
  }, []);

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Automation Engine</span>
          </div>
          <h1 className="text-5xl font-bold tracking-tighter mb-4">Trading <span className="italic font-serif text-primary/80">Bots</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">Deploy and manage institutional-grade trading strategies with our high-frequency execution engine.</p>
        </div>
        <Button className="gap-3 h-12 px-8 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-primary/20">
          <Plus size={18} /> Create New Bot
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-8 bg-secondary/10 backdrop-blur-2xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Activity size={64} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Total P&L</div>
            <div className="text-4xl font-black font-mono tracking-tighter text-emerald-500 mb-2">+$12,450.20</div>
            <div className="text-[10px] font-bold text-emerald-500/60 uppercase tracking-widest">+15.4% from last month</div>
          </div>
        </Card>
        <Card className="p-8 bg-secondary/10 backdrop-blur-2xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Zap size={64} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Active Bots</div>
            <div className="text-4xl font-black font-mono tracking-tighter mb-2">08 <span className="text-muted-foreground/30">/ 12</span></div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">4 bots currently paused</div>
          </div>
        </Card>
        <Card className="p-8 bg-secondary/10 backdrop-blur-2xl border-white/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
            <Shield size={64} />
          </div>
          <div className="relative z-10">
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-4">Risk Level</div>
            <div className="text-4xl font-black font-mono tracking-tighter text-orange-500 mb-2">MODERATE</div>
            <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Auto-stop enabled at 15%</div>
          </div>
        </Card>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between px-6 mb-2">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground">Active Deployments</h3>
          <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
            <span>Sort by: P&L</span>
            <Filter size={12} />
          </div>
        </div>
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-32 rounded-2xl bg-secondary/10 animate-pulse border border-white/5" />)
        ) : (
          bots.map((bot) => (
            <Card key={bot.id} className="p-0 bg-secondary/10 backdrop-blur-2xl border-white/5 group hover:border-primary/30 transition-all overflow-hidden">
              <div className="flex flex-col md:flex-row md:items-center justify-between p-6 gap-6">
                <div className="flex items-center gap-6">
                  <div className={cn(
                    "w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                    bot.status === 'Active' ? "bg-emerald-500/10 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]" : "bg-orange-500/10 text-orange-500"
                  )}>
                    {bot.status === 'Active' ? <Play size={28} className="fill-current" /> : <Pause size={28} className="fill-current" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-black font-mono tracking-tighter group-hover:text-primary transition-colors">{bot.name}</h3>
                    <div className="flex items-center gap-4 text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">
                      <span className="flex items-center gap-1.5"><TrendingUp size={12} /> {bot.strategy}</span>
                      <div className="w-1 h-1 rounded-full bg-white/10" />
                      <span>{bot.trades} Trades</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-12">
                  <div>
                    <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Status</div>
                    <div className={cn(
                      "text-xs font-black font-mono uppercase tracking-widest",
                      bot.status === 'Active' ? "text-emerald-500" : "text-orange-500"
                    )}>{bot.status}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">Win Rate</div>
                    <div className="text-xs font-black font-mono">{bot.winRate}</div>
                  </div>
                  <div>
                    <div className="text-[8px] font-bold text-muted-foreground uppercase tracking-[0.2em] mb-2">P&L</div>
                    <div className={cn(
                      "text-xs font-black font-mono",
                      bot.pnl.startsWith('+') ? "text-emerald-500" : "text-red-500"
                    )}>{bot.pnl}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-white/5 bg-white/[0.02] hover:bg-white/10">
                    <Settings size={18} />
                  </Button>
                  {bot.status === 'Active' ? (
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-white/5 bg-white/[0.02] text-orange-500 hover:bg-orange-500/10">
                      <Pause size={18} />
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-white/5 bg-white/[0.02] text-emerald-500 hover:bg-emerald-500/10">
                      <Play size={18} />
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="h-10 w-10 p-0 rounded-xl border-white/5 bg-white/[0.02] text-red-500 hover:bg-red-500/10">
                    <Square size={18} />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};
