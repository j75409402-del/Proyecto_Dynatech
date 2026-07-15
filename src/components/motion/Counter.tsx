"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

type Props = {
  value: number;
  suffix?: string;
  className?: string;
};

/** Número que cuenta hacia arriba al entrar en pantalla — pa' la stats bar del hero. */
export function Counter({ value, suffix = "", className }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });
  const shouldReduceMotion = useReducedMotion();

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { damping: 30, stiffness: 90 });

  useEffect(() => {
    if (isInView) motionValue.set(value);
  }, [isInView, value, motionValue]);

  useEffect(() => {
    if (shouldReduceMotion) {
      if (ref.current) ref.current.textContent = `${value}${suffix}`;
      return;
    }
    return springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = `${Math.floor(latest)}${suffix}`;
    });
  }, [springValue, suffix, shouldReduceMotion, value]);

  return (
    <span ref={ref} className={className}>
      0{suffix}
    </span>
  );
}
