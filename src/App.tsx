import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Stats } from "./components/Stats";
import { Features } from "./components/Features";
import { Footer } from "./components/Footer";
import { Dashboard } from "./Dashboard";
import { ResearchHub } from "./ResearchHub";
import { TradingDashboard } from "./components/TradingDashboard";
import { TradingBotHub } from "./components/TradingBotHub";
import { AIAssistant } from "./components/AIAssistant";
import { Button } from "./components/ui/Base";

const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <main>
      <Hero />
      <Stats />
      <Features />
      <div className="max-w-7xl mx-auto px-6 py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold mb-8">Ready to master the market?</h2>
        <Button 
          size="lg"
          onClick={() => navigate("/dashboard")}
          className="neon-glow hover:scale-105 transition-transform"
        >
          Get Started for Free
        </Button>
      </div>
    </main>
  );
};

export default function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/intelligence" element={<Dashboard />} />
          <Route path="/trading" element={<TradingDashboard />} />
          <Route path="/bots" element={<TradingBotHub />} />
          <Route path="/research" element={<ResearchHub />} />
        </Routes>

        <Footer />
        <AIAssistant />
      </div>
    </Router>
  );
}
