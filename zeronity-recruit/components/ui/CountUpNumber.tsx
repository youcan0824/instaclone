"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type CountUpNumberProps = {
  end: number;
  suffix?: string;
  label: string;
  duration?: number;
};

export default function CountUpNumber({
  end,
  suffix,
  label,
  duration = 2000,
}: CountUpNumberProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <div ref={ref} className="text-center">
      <span className="gradient-text text-5xl sm:text-6xl font-bold">
        {count}
      </span>
      {suffix && (
        <span className="text-text-label text-2xl sm:text-3xl ml-1">{suffix}</span>
      )}
      <p className="text-text-sub mt-2">{label}</p>
    </div>
  );
}
