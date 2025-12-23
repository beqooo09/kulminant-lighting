"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export default function FadeIn({
  children,
  delay = 0,
  y = 18,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0, y, filter: "blur(6px)" }}
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: "blur(0px)" }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1], // luxury easing
      }}
    >
      {children}
    </motion.div>
  );
}
