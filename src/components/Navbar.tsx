import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Wallet, BarChart3, Shield, Users, Search, LogOut, User as UserIcon, Zap, Activity, BookOpen } from "lucide-react";
import { NavLink, Link } from "react-router-dom";
import { Button } from "./ui/Base";
import { cn, truncateAddress } from "@/src/lib/utils";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { injected } from "wagmi/connectors";
import { useAuth } from "../AuthContext";
import { ThemeToggle } from "./ThemeToggle";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { address, isConnected } = useAccount();
  const { connect } = useConnect();
  const { disconnect: disconnectWagmi } = useDisconnect();
  const { user, profile, login, logout, loading } = useAuth();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleConnect = () => {
    connect({ connector: injected() });
  };

  const navLinks = [
    { name: "Dashboard", href: "/dashboard", icon: BarChart3 },
    { name: "Trading", href: "/trading", icon: Activity },
    { name: "Bots", href: "/bots", icon: Zap },
    { name: "Research", href: "/research", icon: BookOpen },
    { name: "Intelligence", href: "/intelligence", icon: Shield },
  ];

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 py-4",
        isScrolled ? "bg-background/80 backdrop-blur-2xl border-b border-white/5 shadow-2xl" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-12">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-transform group-hover:scale-110 duration-500">
              <BarChart3 className="text-white" size={20} />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tighter leading-none">DATB</span>
              <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-primary leading-none mt-1">Intelligence</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => cn(
                  "text-[10px] font-bold transition-all uppercase tracking-[0.2em] relative py-2",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div 
                        layoutId="nav-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center gap-3 bg-white/[0.03] border border-white/5 rounded-full px-4 py-2 focus-within:border-primary/30 transition-all group">
            <Search size={14} className="text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Search Terminal..." 
              className="bg-transparent border-none text-[11px] font-medium focus:outline-none w-40 placeholder:text-muted-foreground/50"
            />
          </div>
          
          <div className="h-4 w-px bg-white/10" />

          <ThemeToggle />
          
          {/* Web3 Wallet */}
          <div className="flex items-center gap-2">
            <appkit-network-button />
            <appkit-button />
          </div>

          {/* Firebase Auth */}
          {loading ? (
            <div className="w-10 h-10 rounded-full bg-white/5 animate-pulse" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <div className="relative group">
                <div className="p-0.5 rounded-full bg-gradient-to-tr from-primary to-accent">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt="Profile" className="w-9 h-9 rounded-full border-2 border-background object-cover" />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-background flex items-center justify-center">
                      <UserIcon size={18} className="text-primary" />
                    </div>
                  )}
                </div>
                <div className="absolute top-full right-0 mt-3 w-56 bg-secondary/90 backdrop-blur-2xl border border-white/10 rounded-2xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-2xl z-50">
                  <div className="px-4 py-3 border-b border-white/5 mb-2">
                    <p className="text-xs font-bold text-foreground">{user.displayName}</p>
                    <p className="text-[9px] font-bold text-primary uppercase tracking-widest mt-1">{profile?.role || 'User'}</p>
                  </div>
                  <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-bold text-red-400 hover:bg-red-400/10 rounded-xl transition-all">
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <Button size="sm" className="h-10 px-8 rounded-full" onClick={login}>Sign In</Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-border p-6 md:hidden glass"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.href}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3 text-lg font-medium",
                    isActive ? "text-primary" : "text-foreground/70"
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <link.icon size={20} />
                  {link.name}
                </NavLink>
              ))}
              <hr className="border-border my-2" />
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/50">Appearance</span>
                  <ThemeToggle />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-sm text-foreground/50">Wallet</span>
                  <appkit-button />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-foreground/50">Account</span>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold">{user.displayName}</span>
                      <Button variant="ghost" size="sm" onClick={logout} className="p-1 h-auto text-red-400">
                        <LogOut size={14} />
                      </Button>
                    </div>
                  ) : (
                    <Button size="sm" onClick={login}>Sign In</Button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
