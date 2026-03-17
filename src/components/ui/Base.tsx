import React from "react";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = ({
  variant = "primary",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) => {
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_20px_rgba(59,130,246,0.25)]",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80 border border-border/50",
    outline: "border border-primary/40 bg-transparent hover:bg-primary/5 text-primary",
    ghost: "hover:bg-white/[0.03] text-muted-foreground hover:text-foreground",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.1em]",
    md: "px-5 py-2.5 text-xs font-bold uppercase tracking-wider",
    lg: "px-8 py-4 text-sm font-bold uppercase tracking-[0.15em]",
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ y: 0 }}
      className={cn(
        "inline-flex items-center justify-center rounded-full transition-all focus:outline-none disabled:opacity-50 disabled:pointer-events-none",
        variants[variant],
        sizes[size],
        className
      )}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
};

export const Card = ({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("bg-secondary/20 backdrop-blur-md border border-white/5 rounded-2xl transition-all duration-500 hover:border-primary/20", className)}
      {...props}
    >
      {children}
    </div>
  );
};
