"use client";

import { motion } from "framer-motion";

export function HeadphoneSticker() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotate: -15 }}
      animate={{ opacity: 1, scale: 1, rotate: -5 }}
      transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{ scale: 1.05, rotate: -2, cursor: "grab" }}
      whileTap={{ scale: 0.95, cursor: "grabbing" }}
      drag
      dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
      dragElastic={0.2}
      style={{
        position: "absolute",
        top: "70%",
        right: -20,
        width: 140,
        height: 140,
        rotate: 20,
        zIndex: 20,
        filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.4))",
      }}
    >
      <img
        src="headphone.png"
        alt="Headphones Sticker"
        style={{ width: "100%", height: "100%", objectFit: "contain", pointerEvents: "none" }}
      />
    </motion.div>
  );
}
