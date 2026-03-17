import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
    },
  });

  const PORT = 3000;

  app.use(express.json());

  // Mock Data Generators
  const generateCandles = (count = 100) => {
    let lastClose = 65000;
    return Array.from({ length: count }, (_, i) => {
      const open = lastClose;
      const close = open + (Math.random() - 0.5) * 500;
      const high = Math.max(open, close) + Math.random() * 200;
      const low = Math.min(open, close) - Math.random() * 200;
      lastClose = close;
      return {
        time: Math.floor(Date.now() / 1000) - (count - i) * 60,
        open,
        high,
        low,
        close,
      };
    });
  };

  const generateOrderBook = () => {
    const midPrice = 65000 + (Math.random() - 0.5) * 100;
    const asks = Array.from({ length: 15 }, (_, i) => ({
      price: midPrice + (i + 1) * 2,
      amount: Math.random() * 2,
      total: 0
    })).reverse();
    const bids = Array.from({ length: 15 }, (_, i) => ({
      price: midPrice - (i + 1) * 2,
      amount: Math.random() * 2,
      total: 0
    }));
    return { asks, bids };
  };

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  app.get("/api/market/candles", (req, res) => {
    res.json(generateCandles());
  });

  app.get("/api/market/trending", (req, res) => {
    res.json([
      { id: "bitcoin", symbol: "btc", name: "Bitcoin", price: 65432.10, change24h: 2.5, volume24h: 35000000000 },
      { id: "ethereum", symbol: "eth", name: "Ethereum", price: 3456.78, change24h: -1.2, volume24h: 15000000000 },
      { id: "solana", symbol: "sol", name: "Solana", price: 145.20, change24h: 5.7, volume24h: 4000000000 },
      { id: "cardano", symbol: "ada", name: "Cardano", price: 0.45, change24h: 0.8, volume24h: 500000000 },
      { id: "polkadot", symbol: "dot", name: "Polkadot", price: 7.20, change24h: -2.3, volume24h: 300000000 },
    ]);
  });

  app.get("/api/intelligence/feed", (req, res) => {
    res.json([
      { id: 1, type: "Whale", msg: "1,200 BTC moved from unknown wallet to Coinbase", time: "2m ago", severity: "high", details: "Transaction hash: 0x7a...bc91. This is the largest move in 24 hours." },
      { id: 2, type: "Smart Money", msg: "Heavy accumulation of $LINK detected across 12 wallets", time: "15m ago", severity: "medium", details: "Wallets associated with major VC funds have increased their LINK holdings by 15%." },
      { id: 3, type: "Protocol", msg: "Aave V3 deployment on Base mainnet confirmed", time: "45m ago", severity: "low", details: "Deployment successful. Liquidity mining rewards starting in 24 hours." },
      { id: 4, type: "Security", msg: "Potential exploit detected on minor DEX (Polygon)", time: "1h ago", severity: "critical", details: "Users are advised to revoke permissions for contract 0xdead...beef immediately." },
      { id: 5, type: "Social", msg: "Sentiment for $SOL reaching all-time high on X", time: "2h ago", severity: "low", details: "Mentions increased by 400% following the latest breakpoint conference." },
    ]);
  });

  app.post("/api/wallet/analyze", (req, res) => {
    const { address } = req.body;
    if (!address) return res.status(400).json({ error: "Address required" });
    res.json({
      address,
      riskScore: Math.floor(Math.random() * 100),
      portfolioValue: Math.floor(Math.random() * 10000000),
      topHoldings: [
        { asset: "ETH", amount: "124.5", value: 430000 },
        { asset: "USDC", amount: "250,000", value: 250000 },
        { asset: "PEPE", amount: "1,000,000,000", value: 12000 },
      ],
      lastActivity: "3 hours ago",
      labels: ["Whale", "DEX User", "NFT Collector"]
    });
  });

  app.get("/api/bots/status", (req, res) => {
    res.json([
      { id: "bot-1", name: "BTC Scalper Pro", strategy: "Scalping", status: "Active", pnl: "+12.4%", trades: 142, winRate: "68%" },
      { id: "bot-2", name: "ETH Momentum", strategy: "Momentum", status: "Paused", pnl: "+5.2%", trades: 45, winRate: "55%" },
      { id: "bot-3", name: "SOL Swing King", strategy: "Swing", status: "Active", pnl: "-2.1%", trades: 12, winRate: "42%" },
    ]);
  });

  app.get("/api/research/articles", (req, res) => {
    res.json([
      {
        id: 1,
        title: "The Rise of L2s: A Deep Dive into Arbitrum and Optimism",
        category: "Market Analysis",
        author: "DATB Research",
        date: "Mar 12, 2026",
        readTime: "12 min",
        image: "https://picsum.photos/seed/crypto1/800/400",
        tags: ["L2", "Scaling", "Ethereum"],
        content: "Full article content would go here..."
      },
      {
        id: 2,
        title: "Understanding Smart Money: How to Track Whale Movements",
        category: "Tutorial",
        author: "Alex Rivera",
        date: "Mar 10, 2026",
        readTime: "8 min",
        image: "https://picsum.photos/seed/crypto2/800/400",
        tags: ["On-chain", "Whales", "Alpha"],
        content: "Full article content would go here..."
      },
      {
        id: 3,
        title: "DeFi 2.0: The Evolution of Liquidity Provisioning",
        category: "Protocol Review",
        author: "Sarah Chen",
        date: "Mar 08, 2026",
        readTime: "15 min",
        image: "https://picsum.photos/seed/crypto3/800/400",
        tags: ["DeFi", "Liquidity", "Yield"],
        content: "Full article content would go here..."
      }
    ]);
  });

  // WebSocket Simulation
  io.on("connection", (socket) => {
    console.log("Client connected to WebSocket");
    const interval = setInterval(() => {
      socket.emit("price_update", {
        symbol: "BTC/USDT",
        price: 65000 + (Math.random() - 0.5) * 100,
        time: Math.floor(Date.now() / 1000)
      });
      socket.emit("orderbook_update", generateOrderBook());
    }, 2000);
    socket.on("disconnect", () => {
      clearInterval(interval);
      console.log("Client disconnected");
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  httpServer.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
