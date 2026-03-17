import { motion } from "motion/react";
import { formatCompactNumber } from "@/src/lib/utils";

const stats = [
  { label: "Total Users", value: 125000, suffix: "+" },
  { label: "Tokens Tracked", value: 45000, suffix: "" },
  { label: "Transactions Analyzed", value: 12000000, suffix: "+" },
  { label: "Active Communities", value: 850, suffix: "+" },
];

export const Stats = () => {
  return (
    <section className="py-20 border-y border-white/5 bg-white/[0.02]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold mb-2 neon-text">
                {formatCompactNumber(stat.value)}{stat.suffix}
              </div>
              <div className="text-sm text-foreground/50 uppercase tracking-widest font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
