import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  BarChart3, 
  Shield, 
  Users, 
  Search, 
  ArrowUpRight, 
  ArrowDownRight,
  Activity,
  Clock,
  Eye,
  AlertCircle,
  CheckCircle2,
  Info,
  ChevronRight,
  ExternalLink,
  X,
  Zap,
  Globe
} from "lucide-react";
import { Card, Button } from "./components/ui/Base";
import { cn, formatCurrency, formatCompactNumber, truncateAddress } from "./lib/utils";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";
import axios from "axios";

const chartData = [
  { name: "00:00", value: 62000 },
  { name: "04:00", value: 63500 },
  { name: "08:00", value: 61000 },
  { name: "12:00", value: 64000 },
  { name: "16:00", value: 65500 },
  { name: "20:00", value: 64800 },
  { name: "23:59", value: 65432 },
];

export const Dashboard = () => {
  const [trending, setTrending] = useState<any[]>([]);
  const [feed, setFeed] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [walletAddress, setWalletAddress] = useState("");
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedFeedItem, setSelectedFeedItem] = useState<any>(null);

  // Advanced Filters State
  const [feedFilterType, setFeedFilterType] = useState<string>("all");
  const [feedFilterSeverity, setFeedFilterSeverity] = useState<string>("all");
  const [feedSearch, setFeedSearch] = useState("");
  
  const [walletFilterRisk, setWalletFilterRisk] = useState<string>("all");
  const [walletFilterValue, setWalletFilterValue] = useState<string>("0");
  const [walletSearch, setWalletSearch] = useState("");
  const [marketSearch, setMarketSearch] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [marketRes, feedRes] = await Promise.all([
          axios.get("/api/market/trending"),
          axios.get("/api/intelligence/feed")
        ]);
        setTrending(marketRes.data);
        setFeed(feedRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAnalyzeWallet = async () => {
    if (!walletAddress) return;
    setAnalyzing(true);
    try {
      const res = await axios.post("/api/wallet/analyze", { address: walletAddress });
      setAnalysisResult(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setAnalyzing(false);
    }
  };

  const filteredFeed = feed.filter(item => {
    const matchesType = feedFilterType === "all" || item.type.toLowerCase() === feedFilterType.toLowerCase();
    const matchesSeverity = feedFilterSeverity === "all" || item.severity.toLowerCase() === feedFilterSeverity.toLowerCase();
    const matchesSearch = item.msg.toLowerCase().includes(feedSearch.toLowerCase()) || 
                         item.type.toLowerCase().includes(feedSearch.toLowerCase());
    return matchesType && matchesSeverity && matchesSearch;
  });

  const watchlist = [
    { label: "Smart Whale #1", address: "0x1234...5678", balance: "$12.4M", pnl: "+12%", risk: "low", value: 12400000 },
    { label: "VC Fund: Paradigm", address: "0xabcd...efgh", balance: "$450M", pnl: "-2.4%", risk: "low", value: 450000000 },
    { label: "DEX Arbitrageur", address: "0x9876...5432", balance: "$1.2M", pnl: "+45%", risk: "medium", value: 1200000 },
    { label: "Meme Hunter", address: "0x5555...6666", balance: "$45k", pnl: "+450%", risk: "high", value: 45000 },
  ];

  const filteredWatchlist = watchlist.filter(wallet => {
    const matchesRisk = walletFilterRisk === "all" || wallet.risk === walletFilterRisk;
    const matchesValue = wallet.value >= parseInt(walletFilterValue);
    const matchesSearch = wallet.label.toLowerCase().includes(walletSearch.toLowerCase()) || 
                         wallet.address.toLowerCase().includes(walletSearch.toLowerCase());
    return matchesRisk && matchesValue && matchesSearch;
  });

  const filteredMarket = trending.filter(token => 
    token.name.toLowerCase().includes(marketSearch.toLowerCase()) || 
    token.symbol.toLowerCase().includes(marketSearch.toLowerCase())
  );

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-500/80">System Live</span>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Market Intelligence</h1>
          <p className="text-muted-foreground text-sm max-w-md">Real-time cross-chain analytics and institutional-grade signal intelligence.</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/50 p-1 rounded-lg border border-border">
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8 px-4 bg-background shadow-sm">
            Overview
          </Button>
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8 px-4 text-muted-foreground hover:text-foreground">
            Analytics
          </Button>
          <Button variant="ghost" size="sm" className="text-[10px] font-bold uppercase tracking-wider h-8 px-4 text-muted-foreground hover:text-foreground">
            Reports
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Total Market Cap", value: "$2.45T", change: "+2.4%", icon: Globe, color: "text-blue-500" },
          { label: "24h Trading Volume", value: "$84.2B", change: "-5.1%", icon: BarChart3, color: "text-purple-500" },
          { label: "BTC Market Dominance", value: "52.1%", change: "+0.2%", icon: Activity, color: "text-orange-500" },
          { label: "Network Gas Price", value: "12 Gwei", change: "-15%", icon: Zap, color: "text-yellow-500" },
        ].map((stat) => (
          <Card key={stat.label} className="p-6 relative overflow-hidden group hover:border-primary/30 transition-all duration-500">
            <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:opacity-20 transition-opacity">
              <stat.icon size={48} />
            </div>
            <div className="relative z-10">
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.15em] mb-4 block">{stat.label}</span>
              <div className="flex items-end justify-between gap-2">
                <div className="text-3xl font-bold font-mono tracking-tighter">{stat.value}</div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border",
                  stat.change.startsWith("+") ? "text-emerald-500 border-emerald-500/20 bg-emerald-500/5" : "text-red-500 border-red-500/20 bg-red-500/5"
                )}>
                  {stat.change.startsWith("+") ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
                  {stat.change}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Chart Section */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-orange-500/20 rounded-full flex items-center justify-center">
                    <span className="text-orange-500 font-bold text-[10px]">BTC</span>
                  </div>
                  <span className="font-bold text-sm">Bitcoin</span>
                </div>
                <div className="h-4 w-px bg-border" />
                <div className="flex items-baseline gap-2">
                  <span className="text-lg font-bold font-mono">$65,432.10</span>
                  <span className="text-[10px] text-emerald-500 font-bold">+2.5%</span>
                </div>
              </div>
              <div className="flex gap-1 bg-background/50 p-1 rounded border border-border">
                {["1H", "1D", "1W", "1M", "ALL"].map((t) => (
                  <button key={t} className={cn("px-2 py-1 text-[9px] font-bold rounded transition-colors", t === "1D" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-foreground")}>
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              <div className="h-[320px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" opacity={0.03} vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      stroke="currentColor"
                      opacity={0.3}
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                    />
                    <YAxis 
                      stroke="currentColor"
                      opacity={0.3}
                      fontSize={9} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `$${val/1000}k`}
                      domain={['dataMin - 1000', 'dataMax + 1000']}
                    />
                    <Tooltip 
                      contentStyle={{ backgroundColor: "var(--surface)", border: "1px solid var(--border)", borderRadius: "4px", fontSize: "10px" }}
                      itemStyle={{ color: "#3b82f6" }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={1.5}
                      fillOpacity={1} 
                      fill="url(#colorValue)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </Card>

          {/* Market Activity Table */}
          <Card className="p-0 overflow-hidden border-border/50">
            <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity size={14} className="text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Live Market Activity</h3>
              </div>
              <div className="flex items-center gap-4">
                <div className="relative hidden sm:block">
                  <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={12} />
                  <input 
                    type="text"
                    placeholder="Filter assets..."
                    value={marketSearch}
                    onChange={(e) => setMarketSearch(e.target.value)}
                    className="bg-background/50 border border-border rounded-md pl-7 pr-2 py-1.5 text-[10px] focus:outline-none focus:border-primary/50 w-48 transition-all focus:w-64"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                <div className="grid grid-cols-5 px-6 py-3 bg-secondary/10 border-b border-border">
                  <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider italic font-serif">Asset</div>
                  <div className="text-right text-[9px] font-bold text-muted-foreground uppercase tracking-wider italic font-serif">Price</div>
                  <div className="text-right text-[9px] font-bold text-muted-foreground uppercase tracking-wider italic font-serif">24h Change</div>
                  <div className="text-right text-[9px] font-bold text-muted-foreground uppercase tracking-wider italic font-serif">Volume (24h)</div>
                  <div className="text-right text-[9px] font-bold text-muted-foreground uppercase tracking-wider italic font-serif">Market Cap</div>
                </div>
                <div className="divide-y divide-border/50">
                  {loading ? (
                    <div className="p-12 text-center text-muted-foreground text-xs font-mono">INITIALIZING DATA STREAM...</div>
                  ) : filteredMarket.length === 0 ? (
                    <div className="p-12 text-center text-muted-foreground text-xs">No matching assets found in current session.</div>
                  ) : (
                    filteredMarket.map((token) => (
                      <div key={token.symbol} className="grid grid-cols-5 px-6 py-4 items-center cursor-pointer hover:bg-white/[0.02] transition-colors group">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded bg-secondary border border-border flex items-center justify-center text-[10px] font-bold uppercase group-hover:border-primary/50 transition-colors">{token.symbol}</div>
                          <div>
                            <div className="text-xs font-bold">{token.name}</div>
                            <div className="text-[9px] text-muted-foreground font-mono">{token.symbol}/USDT</div>
                          </div>
                        </div>
                        <div className="text-right font-mono text-sm font-medium tracking-tight">${token.price.toLocaleString()}</div>
                        <div className="text-right">
                          <span className={cn(
                            "text-[11px] font-bold px-2 py-0.5 rounded-full",
                            token.change24h > 0 ? "text-emerald-500 bg-emerald-500/10" : "text-red-500 bg-red-500/10"
                          )}>
                            {token.change24h > 0 ? "+" : ""}{token.change24h}%
                          </span>
                        </div>
                        <div className="text-right font-mono text-xs text-muted-foreground">${formatCompactNumber(token.volume24h)}</div>
                        <div className="text-right font-mono text-xs text-muted-foreground">--</div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Sections */}
        <div className="lg:col-span-4 space-y-6">
          {/* Intelligence Feed */}
          <Card className="p-0 overflow-hidden border-border/50">
            <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-primary" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.2em]">Intelligence Feed</h3>
              </div>
              <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => {
                setFeedFilterType("all");
                setFeedFilterSeverity("all");
                setFeedSearch("");
              }}>
                <X size={14} />
              </Button>
            </div>
            
            {/* Advanced Filters for Feed */}
            <div className="p-3 border-b border-border bg-surface/30 space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={12} />
                <input 
                  type="text"
                  placeholder="Filter intelligence..."
                  value={feedSearch}
                  onChange={(e) => setFeedSearch(e.target.value)}
                  className="w-full bg-background/50 border border-border rounded-md pl-7 pr-2 py-1.5 text-[10px] focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={feedFilterType}
                  onChange={(e) => setFeedFilterType(e.target.value)}
                  className="flex-1 bg-background/50 border border-border rounded-md px-2 py-1.5 text-[10px] focus:outline-none"
                >
                  <option value="all">All Types</option>
                  <option value="whale">Whale</option>
                  <option value="smart money">Smart Money</option>
                  <option value="protocol">Protocol</option>
                  <option value="security">Security</option>
                  <option value="social">Social</option>
                </select>
                <select 
                  value={feedFilterSeverity}
                  onChange={(e) => setFeedFilterSeverity(e.target.value)}
                  className="flex-1 bg-background/50 border border-border rounded-md px-2 py-1.5 text-[10px] focus:outline-none"
                >
                  <option value="all">Severity</option>
                  <option value="critical">Critical</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                </select>
              </div>
            </div>

            <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto scrollbar-none divide-y divide-border/30">
              {loading ? (
                <div className="text-center py-4 text-xs text-muted-foreground font-mono">SCANNING NETWORK...</div>
              ) : filteredFeed.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground">No matching intelligence found.</div>
              ) : (
                filteredFeed.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-3 group cursor-pointer pt-4 first:pt-0"
                    onClick={() => setSelectedFeedItem(item)}
                  >
                    <div className={cn("w-1 h-auto rounded-full shrink-0", 
                      item.severity === "critical" ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]" : 
                      item.severity === "high" ? "bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]" : 
                      item.severity === "medium" ? "bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.4)]" : "bg-slate-500"
                    )} />
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-muted-foreground">{item.type}</span>
                        <span className="text-[9px] text-muted-foreground font-mono">{item.time}</span>
                      </div>
                      <p className="text-[11px] leading-relaxed text-foreground/80 group-hover:text-foreground transition-colors">{item.msg}</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <div className="p-3 border-t border-border bg-secondary/10">
              <Button variant="outline" size="sm" className="w-full text-[10px] font-bold uppercase tracking-wider h-8">View Full Intelligence Hub</Button>
            </div>
          </Card>

          {/* Wallet Watchlist */}
          <Card className="p-0 overflow-hidden">
            <div className="p-4 border-b border-border bg-secondary/30 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider">Wallet Watchlist</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="h-7 w-7 p-0" onClick={() => {
                  setWalletFilterRisk("all");
                  setWalletSearch("");
                }}>
                  <X size={14} />
                </Button>
                <Eye size={14} className="text-primary" />
              </div>
            </div>

            {/* Advanced Filters for Wallets */}
            <div className="p-3 border-b border-border bg-surface/50 space-y-2">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 text-muted-foreground" size={12} />
                <input 
                  type="text"
                  placeholder="Search wallets..."
                  value={walletSearch}
                  onChange={(e) => setWalletSearch(e.target.value)}
                  className="w-full bg-background border border-border rounded pl-7 pr-2 py-1.5 text-[10px] focus:outline-none focus:border-primary/50"
                />
              </div>
              <div className="flex gap-2">
                <select 
                  value={walletFilterRisk}
                  onChange={(e) => setWalletFilterRisk(e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-2 py-1 text-[10px] focus:outline-none"
                >
                  <option value="all">All Risk</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
                <select 
                  value={walletFilterValue}
                  onChange={(e) => setWalletFilterValue(e.target.value)}
                  className="flex-1 bg-background border border-border rounded px-2 py-1 text-[10px] focus:outline-none"
                >
                  <option value="0">All Values</option>
                  <option value="100000">&gt; $100k</option>
                  <option value="1000000">&gt; $1M</option>
                  <option value="10000000">&gt; $10M</option>
                </select>
              </div>
            </div>

            <div className="p-2 max-h-[300px] overflow-y-auto scrollbar-none">
              {filteredWatchlist.length === 0 ? (
                <div className="text-center py-8 text-xs text-muted-foreground">No matching wallets found.</div>
              ) : (
                filteredWatchlist.map((wallet, i) => (
                  <div 
                    key={i} 
                    className="p-2 rounded hover:bg-surface transition-colors flex items-center justify-between group cursor-pointer"
                    onClick={() => {
                      setWalletAddress(wallet.address);
                      handleAnalyzeWallet();
                    }}
                  >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-secondary flex items-center justify-center">
                      <Wallet size={14} className="text-muted-foreground" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold">{wallet.label}</div>
                      <div className="text-[9px] font-mono text-muted-foreground">{wallet.address}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-[11px] font-bold font-mono">{wallet.balance}</div>
                    <div className={cn("text-[9px] font-bold", wallet.pnl.startsWith("+") ? "text-emerald-500" : "text-red-500")}>{wallet.pnl}</div>
                  </div>
                </div>
              )))}
              <div className="p-2 mt-2">
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={walletAddress}
                    onChange={(e) => setWalletAddress(e.target.value)}
                    placeholder="Add wallet to track..." 
                    className="w-full bg-background border border-border rounded px-3 py-2 text-[10px] focus:outline-none focus:border-primary/50"
                  />
                  <Button size="sm" onClick={handleAnalyzeWallet} disabled={analyzing}>
                    {analyzing ? "..." : "Add"}
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Analysis Result Section */}
      <AnimatePresence>
        {analysisResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="mt-8"
          >
            <Card className="p-6 border-primary/30 bg-primary/5">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Wallet size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold">Analysis for {analysisResult.address}</h3>
                    <div className="flex gap-2 mt-1">
                      {analysisResult.labels.map((label: string) => (
                        <span key={label} className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/20">{label}</span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Risk Score</div>
                  <div className={cn("text-2xl font-bold font-mono", analysisResult.riskScore > 70 ? "text-red-500" : analysisResult.riskScore > 30 ? "text-yellow-500" : "text-emerald-500")}>
                    {analysisResult.riskScore}/100
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded bg-background/50 border border-border">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Portfolio Value</div>
                  <div className="text-2xl font-bold font-mono">${analysisResult.portfolioValue.toLocaleString()}</div>
                </div>
                <div className="p-4 rounded bg-background/50 border border-border">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Last Activity</div>
                  <div className="text-xl font-bold">{analysisResult.lastActivity}</div>
                </div>
                <div className="p-4 rounded bg-background/50 border border-border">
                  <div className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Top Holding</div>
                  <div className="text-xl font-bold">{analysisResult.topHoldings[0].asset} ({analysisResult.topHoldings[0].amount})</div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button variant="ghost" size="sm" onClick={() => setAnalysisResult(null)}>Close Analysis</Button>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Feed Item Detail Modal (Simplified) */}
      <AnimatePresence>
        {selectedFeedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-lg"
            >
              <Card className="p-6 shadow-2xl border-primary/20">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{selectedFeedItem.type} Intelligence</span>
                  <button onClick={() => setSelectedFeedItem(null)} className="text-muted-foreground hover:text-foreground">
                    <X size={20} />
                  </button>
                </div>
                <h3 className="text-xl font-bold mb-4">{selectedFeedItem.msg}</h3>
                <div className="p-4 rounded bg-secondary/50 border border-border mb-6">
                  <p className="text-sm leading-relaxed text-foreground/80">{selectedFeedItem.details}</p>
                </div>
                <div className="flex items-center justify-between text-[10px] text-muted-foreground">
                  <span>Timestamp: {selectedFeedItem.time}</span>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">Share</Button>
                    <Button size="sm">Investigate on-chain</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Wallet Intelligence Preview */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
         <Card className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
              <Shield size={40} />
            </div>
            <div className="flex-1 w-full">
              <h3 className="text-xl font-bold mb-2">Wallet Intelligence</h3>
              <p className="text-sm text-foreground/50 mb-4">Analyze any wallet address to see portfolio value, risk score, and historical performance.</p>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={walletAddress}
                  onChange={(e) => setWalletAddress(e.target.value)}
                  placeholder="Enter wallet address (0x...)" 
                  className="bg-surface border border-border rounded-md px-3 py-2 text-sm flex-1 focus:outline-none focus:border-primary/50"
                />
                <Button size="sm" onClick={handleAnalyzeWallet} disabled={analyzing}>
                  {analyzing ? "..." : "Analyze"}
                </Button>
              </div>
            </div>
         </Card>

         <Card className="p-6 flex flex-col md:flex-row gap-6 items-center">
            <div className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
              <Users size={40} />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Community Insights</h3>
              <p className="text-sm text-foreground/50 mb-4">Track social sentiment, developer activity, and community growth for any Web3 project.</p>
              <Button variant="outline" size="sm">Explore Communities</Button>
            </div>
         </Card>
      </div>
    </div>
  );
};
