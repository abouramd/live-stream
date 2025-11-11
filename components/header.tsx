"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";

export function Header() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // Fade in header on mount
    // gsap.from(headerRef.current, {
    //   opacity: 0,
    //   y: -20,
    //   duration: 0.6,
    //   ease: "power2.out",
    // });
  }, []);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 "
    >
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-80 transition-opacity">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold"
            style={{ background: 'linear-gradient(135deg, var(--brand-start), var(--brand-end))' }}
          >
            ▶
          </div>
          <span className="hidden sm:inline">Watch Live</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Home
          </Link>
          <Link
            href="/?live=true"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Live Now
          </Link>
          <a
            href="https://github.com/Bouramdane/watch-live"
            target="_blank"
            rel="noreferrer"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            GitHub
          </a>
        </nav>

        {/* Mode toggle removed per request - keep header minimal on sports pages */}
      </div>
    </header>
  );
}
