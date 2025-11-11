// app/stream/[matchId]/page.tsx
"use client"; // <-- This is essential

import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { getMatchById, getStreams, getBadgeUrl } from "@/lib/api";
import type { APIMatch, Stream } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound, useParams } from "next/navigation";
import { Header } from "@/components/header";
import { ExternalLink, Play, Zap, Globe } from "lucide-react";

// Helper component for loading
function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center h-64 gap-4">
      <div className="w-16 h-16 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
      <p className="text-muted-foreground">Loading streams...</p>
    </div>
  );
}

export default function StreamPage() {
  const params = useParams();
  const { matchId } = params as { matchId: string };
  const titleRef = useRef<HTMLHeadingElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  // State to hold all our data
  const [match, setMatch] = useState<APIMatch | null>(null);
  const [streams, setStreams] = useState<Stream[]>([]);
  const [selectedStreamUrl, setSelectedStreamUrl] = useState<string | null>(
    null
  );
  const [isLoadingMatch, setIsLoadingMatch] = useState(true);
  const [isLoadingStreams, setIsLoadingStreams] = useState(false);

  // 1. Fetch the match details on component load
  useEffect(() => {
    async function fetchMatch() {
      setIsLoadingMatch(true);
      const matchData = await getMatchById(matchId);
      setMatch(matchData);
      setIsLoadingMatch(false);
    }
    fetchMatch();
  }, [matchId]);

  // Animate title on mount
  useEffect(() => {
    if (titleRef.current) {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      });
    }
    if (infoRef.current) {
      gsap.from(infoRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.1,
        ease: "power2.out",
      });
    }
  }, [match]);

  // 2. Function to fetch streams when a source is clicked
  const handleSourceClick = async (source: string, id: string) => {
    setIsLoadingStreams(true);
    setStreams([]); // Clear old streams
    setSelectedStreamUrl(null); // Clear old player
    const streamData = await getStreams(source, id);
    setStreams(streamData);
    setIsLoadingStreams(false);
  };

  // 3. Function to set the player URL when a stream is clicked
  const handleStreamClick = (stream: Stream) => {
    setSelectedStreamUrl(stream.embedUrl);
  };

  if (isLoadingMatch) {
    return (
      <>
        <Header />
        <main className="container p-4 mx-auto">
          <LoadingSpinner />
        </main>
      </>
    );
  }

  if (!match) {
    return notFound();
  }

  const matchDate = new Date(match.date);
  const isLive = match.popular;

  return (
    <>
      <Header />
      <main className="container p-4 mx-auto max-w-screen-2xl">
        {/* Match Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center gap-3 flex-wrap">
            <h1
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold"
            >
              {match.title}
            </h1>
            {isLive && (
              <Badge className="bg-red-500 hover:bg-red-600 animate-pulse">
                🔴 LIVE
              </Badge>
            )}
          </div>
          <div ref={infoRef} className="flex items-center gap-4 flex-wrap">
            <p className="text-lg text-muted-foreground">
              {matchDate.toLocaleString()}
            </p>
            <div className="flex gap-2">
              <Badge variant="secondary">{match.category}</Badge>
              <Badge variant="outline">{match.sources.length} sources</Badge>
            </div>
          </div>
        </div>

        {/* Team Information */}
        {match.teams && (
          <Card className="mb-8 border-primary/20">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        match.teams.home?.badge
                          ? getBadgeUrl(match.teams.home.badge)
                          : ""
                      }
                    />
                    <AvatarFallback>
                      {match.teams.home?.name?.[0] || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-center">
                    {match.teams.home?.name || "Home"}
                  </p>
                </div>

                <div className="text-center">
                  <p className="text-3xl font-bold text-muted-foreground">vs</p>
                </div>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2 flex-1">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={
                        match.teams.away?.badge
                          ? getBadgeUrl(match.teams.away.badge)
                          : ""
                      }
                    />
                    <AvatarFallback>
                      {match.teams.away?.name?.[0] || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <p className="font-semibold text-center">
                    {match.teams.away?.name || "Away"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Main Content Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* Source Selection */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Select Source
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {match.sources.length > 0 ? (
                <div className="flex flex-col gap-2">
                  {match.sources.map((s) => (
                    <Button
                      key={s.source}
                      variant={
                        streams.length > 0 ? "default" : "outline"
                      }
                      onClick={() => handleSourceClick(s.source, s.id)}
                      className="justify-start"
                      size="sm"
                    >
                      <Globe className="w-4 h-4 mr-2" />
                      {s.source}
                    </Button>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  No sources available
                </p>
              )}
            </CardContent>
          </Card>

          {/* Stream Selection & Player */}
          <div className="md:col-span-2 space-y-6">
            {/* Video Player */}
            {selectedStreamUrl ? (
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Now Playing
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="relative w-full pb-[56.25%] bg-black rounded-lg overflow-hidden">
                    <iframe
                      src={selectedStreamUrl}
                      className="absolute top-0 left-0 w-full h-full border-0"
                      allowFullScreen
                      allow="autoplay *; fullscreen *"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-dashed bg-muted/50">
                <CardContent className="flex items-center justify-center h-64 flex-col gap-4">
                  <Play className="w-12 h-12 text-muted-foreground opacity-50" />
                  <p className="text-muted-foreground">
                    Select a source and stream to start watching
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Streams List */}
            {isLoadingStreams ? (
              <Card>
                <CardContent className="pt-6">
                  <LoadingSpinner />
                </CardContent>
              </Card>
            ) : streams.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">
                    Available Streams ({streams.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {streams.map((stream) => (
                      <Button
                        key={stream.id}
                        variant={
                          selectedStreamUrl === stream.embedUrl
                            ? "default"
                            : "outline"
                        }
                        onClick={() => handleStreamClick(stream)}
                        className="justify-between"
                      >
                        <div className="flex items-center gap-2">
                          {stream.hd && (
                            <Badge variant="secondary" className="text-xs">
                              HD
                            </Badge>
                          )}
                          <span>
                            {stream.language} - {stream.streamNo}
                          </span>
                        </div>
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
