"use client";

import { motion } from "framer-motion";

export default function GeometricShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Triangle */}
      <motion.div
        className="absolute top-[15%] left-[10%] w-16 h-16 border-2 border-accent-purple/30"
        style={{ clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }}
        animate={{ y: [0, -20, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Hexagon */}
      <motion.div
        className="absolute top-[25%] right-[12%] w-20 h-20 border-2 border-accent-red/20"
        style={{
          clipPath:
            "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
        }}
        animate={{ y: [0, 15, 0], rotate: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Circle */}
      <motion.div
        className="absolute top-[60%] left-[8%] w-12 h-12 rounded-full border-2 border-accent-purple/20"
        animate={{ y: [0, 25, 0], rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Diamond */}
      <motion.div
        className="absolute top-[70%] right-[15%] w-14 h-14 border-2 border-accent-red/30"
        style={{ clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)" }}
        animate={{ y: [0, -15, 0], rotate: [0, 20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Small circle */}
      <motion.div
        className="absolute top-[40%] right-[30%] w-6 h-6 rounded-full border-2 border-accent-purple/20"
        animate={{ y: [0, 10, 0], rotate: [0, -20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
