import { motion } from "motion/react";
import { ArrowRight, ChevronRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/Base";

export const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative pt-40 pb-32 overflow-hidden bg-background">
      {/* Background Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-secondary/50 border border-white/5 text-[10px] font-bold uppercase tracking-[0.2em] text-primary mb-12 shadow-2xl backdrop-blur-md"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Intelligence v2.0 is now live
          <ChevronRight size={14} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] uppercase"
        >
          Master the <br />
          <span className="text-primary italic font-serif lowercase tracking-normal">Blockchain</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Institutional-grade analytics, real-time wallet intelligence, and AI-powered trading signals for the modern Web3 investor.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <Button size="lg" className="h-14 px-10 gap-3 w-full sm:w-auto text-[11px] font-bold uppercase tracking-widest rounded-full shadow-[0_0_20px_rgba(59,130,246,0.3)]" onClick={() => navigate("/dashboard")}>
            Launch Terminal <ArrowRight size={18} />
          </Button>
          <Button variant="outline" size="lg" className="h-14 px-10 gap-3 w-full sm:w-auto text-[11px] font-bold uppercase tracking-widest rounded-full border-white/10 hover:bg-white/5">
            <Play size={16} fill="currentColor" />
            Watch Intelligence
          </Button>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="mt-24 relative max-w-5xl mx-auto"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[120px] -z-10 rounded-full" />
          <div className="p-1 rounded-2xl bg-gradient-to-b from-white/10 to-transparent border border-white/5 shadow-2xl overflow-hidden">
            <div className="rounded-xl overflow-hidden bg-background/40 backdrop-blur-sm">
              <img 
                src="https://picsum.photos/seed/crypto-terminal/1600/900" 
                alt="Terminal Preview" 
                className="w-full h-auto opacity-90 mix-blend-luminosity hover:mix-blend-normal transition-all duration-1000"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
