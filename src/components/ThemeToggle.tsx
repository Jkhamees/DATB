import { Moon, Sun } from "lucide-react";
import { useTheme } from "../ThemeContext";
import { motion } from "motion/react";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 rounded-full bg-white/5 border border-white/10 flex items-center px-1 transition-colors hover:border-primary/50"
      aria-label="Toggle Theme"
    >
      <motion.div
        animate={{ x: theme === "dark" ? 28 : 0 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="w-5 h-5 rounded-full bg-primary flex items-center justify-center text-white"
      >
        {theme === "dark" ? <Moon size={12} /> : <Sun size={12} />}
      </motion.div>
      <div className="absolute inset-0 flex justify-between items-center px-2 pointer-events-none">
        <Sun size={10} className={theme === "light" ? "text-primary opacity-0" : "text-foreground/20"} />
        <Moon size={10} className={theme === "dark" ? "text-primary opacity-0" : "text-foreground/20"} />
      </div>
    </button>
  );
};
