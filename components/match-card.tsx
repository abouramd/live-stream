// components/match-card.tsx
"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { APIMatch } from "@/lib/types";
import { getBadgeUrl } from "@/lib/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface MatchCardProps {
  match: APIMatch;
}

export function MatchCard({ match }: MatchCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const matchDate = new Date(match.date);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // Hover animation
    const handleMouseEnter = () => {
      gsap.to(card, {
        y: -8,
        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
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

  const isLive = match.popular; // Assuming popular matches are live

  return (
    <div ref={cardRef} className="w-full h-full bg-transparent">
      <Card className="w-full overflow-hidden transition-all h-full">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-lg truncate flex-1">{match.title}</CardTitle>
          </div>
          <p className="text-sm text-muted-foreground">
            {matchDate.toLocaleString()}
          </p>
        </CardHeader>
        {match.teams?.home && match.teams?.away && (
        <CardContent>
          <div className="flex items-center justify-around gap-4">
            {/* Home Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    match.teams?.home?.badge
                      ? getBadgeUrl(match.teams.home.badge)
                      : ""
                  }
                />
                <AvatarFallback>
                  {match.teams?.home?.name?.[0] || "T1"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-center text-sm">
                {match.teams?.home?.name || "Home Team"}
              </span>
            </div>

            <span className="text-2xl font-bold text-muted-foreground">vs</span>

            {/* Away Team */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={
                    match.teams?.away?.badge
                      ? getBadgeUrl(match.teams.away.badge)
                      : ""
                  }
                />
                <AvatarFallback>
                  {match.teams?.away?.name?.[0] || "T2"}
                </AvatarFallback>
              </Avatar>
              <span className="font-medium text-center text-sm">
                {match.teams?.away?.name || "Away Team"}
              </span>
            </div>
          </div>
        </CardContent>
        )}
        <CardFooter className="mt-auto flex gap-2">
          {/* This button would link to your stream page */}
          <Button asChild className="w-full">
            <Link href={`/stream/${match.id}`}>Watch Now</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}