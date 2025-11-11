"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Hook for fade-in animations on mount
 */
export const useFadeIn = (duration = 0.6, delay = 0) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    gsap.fromTo(
      ref.current,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        delay,
        ease: "power2.out",
      }
    );
  }, [duration, delay]);

  return ref;
};

/**
 * Hook for stagger animations
 */
export const useStagger = (selector: string, duration = 0.6, stagger = 0.1) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(selector);

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        ease: "power2.out",
      }
    );
  }, [selector, duration, stagger]);

  return containerRef;
};

/**
 * Hook for scroll-triggered animations
 */
export const useScrollTrigger = (
  selector: string,
  duration = 0.6,
  stagger = 0.1
) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const children = containerRef.current.querySelectorAll(selector);

    gsap.fromTo(
      children,
      {
        opacity: 0,
        y: 50,
      },
      {
        opacity: 1,
        y: 0,
        duration,
        stagger,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center center",
          toggleActions: "play pause resume pause",
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [selector, duration, stagger]);

  return containerRef;
};

/**
 * Hook for card hover animations
 */
export const useCardHover = () => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(card, {
        y: 0,
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        duration: 0.3,
        ease: "power2.out",
      });
    };

    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return cardRef;
};
