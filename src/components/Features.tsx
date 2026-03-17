import { motion } from "motion/react";
import { BarChart3, Shield, Users, Search, Zap, Globe, Cpu, Lock } from "lucide-react";
import { Card } from "./ui/Base";

const features = [
  {
    title: "Crypto Analytics",
    description: "Real-time market data, volume analysis, and price tracking for thousands of tokens.",
    icon: BarChart3,
    color: "text-blue-500",
  },
  {
    title: "Wallet Intelligence",
    description: "Track smart money, whale movements, and portfolio performance across multiple chains.",
    icon: Shield,
    color: "text-purple-500",
  },
  {
    title: "Market Insights",
    description: "AI-driven market sentiment analysis and trending token discovery.",
    icon: Search,
    color: "text-emerald-500",
  },
  {
    title: "Community Research",
    description: "Deep dive into project fundamentals, community growth, and social metrics.",
    icon: Users,
    color: "text-orange-500",
  },
  {
    title: "High Performance",
    description: "Lightning fast data updates with sub-second latency for critical market moves.",
    icon: Zap,
    color: "text-yellow-500",
  },
  {
    title: "Cross-Chain Support",
    description: "Analyze data across Ethereum, Solana, BSC, and major Layer 2 networks.",
    icon: Globe,
    color: "text-cyan-500",
  },
];

export const Features = () => {
  return (
    <section id="features" className="py-32">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Built for the <span className="text-primary">Next Generation</span> of Traders</h2>
          <p className="text-foreground/60 max-w-2xl mx-auto">
            DATB combines advanced blockchain data with intuitive interfaces to give you the edge in the fast-paced Web3 market.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full group hover:bg-white/[0.08]">
                <div className={cn("w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center mb-6 transition-colors group-hover:bg-primary/20", feature.color)}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-foreground/60 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

import { cn } from "@/src/lib/utils";
