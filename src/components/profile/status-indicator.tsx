"use client";

import { motion } from "framer-motion";

export function StatusIndicator({ status = "ONLINE" }: { status?: string }) {
  return (
    <div className="flex items-center gap-2 mb-4">
      <div className="relative flex items-center justify-center">
        <motion.div 
          className="absolute w-3 h-3 bg-ocean-success rounded-full opacity-40"
          animate={{ scale: [1, 1.8, 1], opacity: [0.4, 0, 0.4] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="relative w-2 h-2 bg-ocean-success rounded-full" />
      </div>
      <span className="text-xs font-semibold text-ocean-success tracking-widest uppercase">
        {status}
      </span>
    </div>
  );
}
