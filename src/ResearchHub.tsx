import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, BookOpen, FileText, Play, ArrowRight, Clock, Tag, X, User as UserIcon } from "lucide-react";
import { Card, Button } from "./components/ui/Base";
import { cn } from "./lib/utils";
import axios from "axios";

export const ResearchHub = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await axios.get("/api/research/articles");
        setArticles(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const filteredArticles = articles.filter(a => 
    a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.tags.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="pt-24 pb-12 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-primary rounded-full" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Intelligence Hub</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tighter mb-4">Research & <span className="italic font-serif text-primary/80">Analysis</span></h1>
          <p className="text-muted-foreground text-lg max-w-2xl leading-relaxed">Institutional-grade market analysis, protocol deep-dives, and educational resources for the modern digital asset investor.</p>
        </div>
        <div className="flex items-center gap-3 bg-secondary/50 p-2 rounded-xl border border-border w-full md:w-96 shadow-2xl">
          <Search size={18} className="text-muted-foreground ml-2" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search reports, data, tutorials..." 
            className="bg-transparent border-none text-sm focus:outline-none w-full px-2 placeholder:text-muted-foreground/50"
          />
        </div>
      </div>

      {/* Featured Article */}
      {articles.length > 0 && (
        <Card className="p-0 overflow-hidden mb-20 group cursor-pointer border-border/50 bg-secondary/20 hover:border-primary/30 transition-all duration-700" onClick={() => setSelectedArticle(articles[0])}>
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="lg:col-span-7 relative h-80 lg:h-[500px] overflow-hidden">
              <img 
                src={articles[0].image} 
                alt="Featured" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent hidden lg:block" />
              <div className="absolute top-6 left-6">
                <span className="bg-primary/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-widest shadow-xl border border-white/10">Featured Report</span>
              </div>
            </div>
            <div className="lg:col-span-5 p-8 lg:p-16 flex flex-col justify-center relative">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-[10px] font-bold text-primary uppercase tracking-[0.2em]">{articles[0].category}</span>
                <div className="w-1 h-1 rounded-full bg-border" />
                <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono uppercase">
                  <Clock size={12} />
                  <span>{articles[0].readTime} read</span>
                </div>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6 leading-[1.1] tracking-tight group-hover:text-primary transition-colors duration-500">
                {articles[0].title}
              </h2>
              <p className="text-muted-foreground text-lg mb-10 line-clamp-3 leading-relaxed">
                Explore our comprehensive analysis of the current market state, institutional trends, and regulatory shifts in the crypto landscape.
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center shadow-lg group-hover:border-primary/50 transition-colors">
                    <FileText size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-bold tracking-tight">{articles[0].author}</div>
                    <div className="text-[10px] text-muted-foreground uppercase tracking-widest">Senior Analyst</div>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full border border-border flex items-center justify-center group-hover:bg-primary group-hover:border-primary transition-all duration-500 group-hover:text-white">
                  <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Categories */}
      <div className="flex gap-3 mb-12 overflow-x-auto pb-4 scrollbar-none">
        {["All Research", "Market Analysis", "Protocol Reviews", "Tutorials", "On-chain Data", "Macro", "Security"].map((cat, i) => (
          <button 
            key={cat} 
            onClick={() => setSearchQuery(cat === "All Research" ? "" : cat)}
            className={cn(
              "whitespace-nowrap px-6 py-2.5 rounded-full text-[10px] font-bold uppercase tracking-widest border transition-all duration-300",
              (searchQuery === cat || (cat === "All Research" && searchQuery === "")) 
                ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(59,130,246,0.3)]" 
                : "bg-secondary/50 border-border text-muted-foreground hover:border-primary/50 hover:text-foreground hover:bg-secondary"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Article Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {loading ? (
          [1, 2, 3].map(i => <div key={i} className="h-80 rounded-2xl bg-secondary/50 animate-pulse border border-border/50" />)
        ) : (
          filteredArticles.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="p-0 overflow-hidden h-full flex flex-col group cursor-pointer border-border/50 bg-secondary/10 hover:border-primary/30 transition-all duration-500" onClick={() => setSelectedArticle(article)}>
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className="bg-primary/90 backdrop-blur-md text-[9px] font-bold px-2.5 py-1 rounded-full border border-white/10 text-white uppercase tracking-widest">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex items-center gap-1.5 text-[10px] text-muted-foreground font-mono uppercase">
                      <Clock size={12} />
                      <span>{article.readTime}</span>
                    </div>
                    <div className="w-1 h-1 rounded-full bg-border" />
                    <span className="text-[10px] text-muted-foreground font-mono uppercase">{article.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-6 line-clamp-2 group-hover:text-primary transition-colors duration-300 leading-tight tracking-tight">{article.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-8">
                    {article.tags.map((tag: string) => (
                      <span key={tag} className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-secondary border border-border text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors">#{tag}</span>
                    ))}
                  </div>
                  <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                        <UserIcon size={12} className="text-primary" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">{article.author}</span>
                    </div>
                    <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:border-primary/50 group-hover:text-primary transition-all">
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Article Detail Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/90 backdrop-blur-md overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="w-full max-w-4xl my-auto"
            >
              <Card className="p-0 overflow-hidden shadow-2xl">
                <div className="relative h-64 md:h-96">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-6 right-6 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <div className="p-8 md:p-12 -mt-20 relative">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="bg-primary text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-widest">{selectedArticle.category}</span>
                    <span className="text-xs text-muted-foreground">{selectedArticle.date} • {selectedArticle.readTime} read</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">{selectedArticle.title}</h2>
                  <div className="flex items-center gap-4 mb-10 pb-10 border-b border-border">
                    <div className="w-12 h-12 rounded-full bg-surface border border-border flex items-center justify-center">
                      <FileText size={24} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-bold">{selectedArticle.author}</div>
                      <div className="text-sm text-muted-foreground">DATB Intelligence Analyst</div>
                    </div>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <p className="text-lg leading-relaxed text-foreground/80 mb-6">
                      {selectedArticle.content}
                    </p>
                    <p className="text-lg leading-relaxed text-foreground/80">
                      In this report, we explore the fundamental shifts occurring in the blockchain ecosystem. From the rapid adoption of Layer 2 solutions to the increasing sophistication of institutional trading strategies, the landscape is evolving faster than ever. DATB's proprietary on-chain models suggest a significant trend towards...
                    </p>
                  </div>
                  <div className="mt-12 flex justify-center">
                    <Button size="lg" onClick={() => setSelectedArticle(null)}>Close Article</Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Video Section */}
      <div className="mt-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Video Intelligence</h2>
          <Button variant="ghost" size="sm">View All Videos</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map((v) => (
            <Card key={v} className="p-0 overflow-hidden group cursor-pointer relative aspect-video">
              <img 
                src={`https://picsum.photos/seed/video${v}/1200/800`} 
                alt="Video" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center transition-colors group-hover:bg-black/20">
                <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center text-white shadow-xl transition-transform group-hover:scale-110">
                  <Play size={32} fill="currentColor" />
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">Video Tutorial</div>
                <h3 className="text-xl font-bold text-white">Advanced Technical Analysis with DATB Intelligence</h3>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
