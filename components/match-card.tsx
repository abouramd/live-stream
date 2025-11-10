// components/match-card.tsx
"use client";

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
import Link from "next/link";

interface MatchCardProps {
  match: APIMatch;
}

export function MatchCard({ match }: MatchCardProps) {
  const matchDate = new Date(match.date);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg truncate">{match.title}</CardTitle>
        <p className="text-sm text-muted-foreground">
          {matchDate.toLocaleString()}
        </p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-around gap-4">
          {/* Home Team */}
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage
                src={match.teams?.home?.badge ? getBadgeUrl(match.teams.home.badge) : ""}
              />
              <AvatarFallback>
                {match.teams?.home?.name?.[0] || "T1"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-center">
              {match.teams?.home?.name || "Home Team"}
            </span>
          </div>

          <span className="text-2xl font-bold">vs</span>

          {/* Away Team */}
          <div className="flex flex-col items-center gap-2">
            <Avatar>
              <AvatarImage
                src={match.teams?.away?.badge ? getBadgeUrl(match.teams.away.badge) : ""}
              />
              <AvatarFallback>
                {match.teams?.away?.name?.[0] || "T2"}
              </AvatarFallback>
            </Avatar>
            <span className="font-medium text-center">
              {match.teams?.away?.name || "Away Team"}
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {/* This button would link to your stream page */}
        <Button asChild className="w-full">
          <Link href={`/stream/${match.id}`}>Watch Now</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}