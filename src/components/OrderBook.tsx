import React, { useState, useEffect } from 'react';
import { Card } from './ui/Base';
import { io } from 'socket.io-client';
import { cn } from '../lib/utils';

import { BarChart3 } from 'lucide-react';

export const OrderBook = () => {
  const [orderBook, setOrderBook] = useState<{ asks: any[], bids: any[] }>({ asks: [], bids: [] });

  useEffect(() => {
    const socket = io();
    socket.on('orderbook_update', (data) => {
      setOrderBook(data);
    });
    return () => {
      socket.disconnect();
    };
  }, []);

  return (
    <Card className="p-0 bg-secondary/10 backdrop-blur-2xl border-white/5 h-full flex flex-col overflow-hidden">
      <div className="p-4 border-b border-white/5 bg-white/[0.02] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded-lg bg-primary/20 flex items-center justify-center">
            <BarChart3 size={14} className="text-primary" />
          </div>
          <h3 className="text-[10px] font-bold uppercase tracking-[0.25em] text-foreground/80">Order Book</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-3 text-[8px] font-black text-muted-foreground uppercase tracking-[0.2em] py-3 px-5 bg-white/[0.01] border-b border-white/5">
        <span>Price</span>
        <span className="text-right">Amount</span>
        <span className="text-right">Total</span>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col">
        {/* Asks (Sells) */}
        <div className="flex flex-col-reverse">
          {orderBook.asks.map((ask, i) => (
            <div key={i} className="relative grid grid-cols-3 text-[10px] font-mono py-1.5 px-5 group hover:bg-red-500/5 transition-colors">
              <div className="absolute inset-y-0 right-0 bg-red-500/10 transition-all duration-500" style={{ width: `${(ask.amount / 2) * 100}%` }} />
              <span className="text-red-500 font-bold relative z-10">{ask.price.toFixed(2)}</span>
              <span className="text-right text-foreground/70 relative z-10">{ask.amount.toFixed(4)}</span>
              <span className="text-right text-muted-foreground/50 relative z-10">{(ask.price * ask.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>

        {/* Spread */}
        <div className="py-4 my-2 border-y border-white/5 flex items-center justify-between px-5 bg-white/[0.02]">
          <div className="text-base font-black text-foreground font-mono tracking-tighter">65,000.00</div>
          <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Spread: 4.00 (0.01%)</div>
        </div>

        {/* Bids (Buys) */}
        <div className="flex flex-col">
          {orderBook.bids.map((bid, i) => (
            <div key={i} className="relative grid grid-cols-3 text-[10px] font-mono py-1.5 px-5 group hover:bg-emerald-500/5 transition-colors">
              <div className="absolute inset-y-0 right-0 bg-emerald-500/10 transition-all duration-500" style={{ width: `${(bid.amount / 2) * 100}%` }} />
              <span className="text-emerald-500 font-bold relative z-10">{bid.price.toFixed(2)}</span>
              <span className="text-right text-foreground/70 relative z-10">{bid.amount.toFixed(4)}</span>
              <span className="text-right text-muted-foreground/50 relative z-10">{(bid.price * bid.amount).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
