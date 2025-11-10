// app/stream/[matchId]/page.tsx
"use client"; // <-- This is essential

import { useEffect, useState } from "react";
import { getMatchById, getStreams } from "@/lib/api";
import type { APIMatch, Stream } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { notFound, useParams } from "next/navigation";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// Helper component for loading
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-16 h-16 border-4 border-t-4 rounded-full border-primary border-t-transparent animate-spin"></div>
    </div>
  );
}

export default function StreamPage() {
  const params = useParams();
  const { matchId } = params as { matchId: string };

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
    return <LoadingSpinner />;
  }

  if (!match) {
    return notFound();
  }

  return (
    <main className="container p-4 mx-auto">
      <h1 className="mb-4 text-3xl font-bold">{match.title}</h1>
      <p className="mb-6 text-lg text-muted-foreground">
        {new Date(match.date).toLocaleString()}
      </p>

      {/* --- Stream Player --- */}
      <Card className="mb-6">
        <CardContent className="p-0 aspect-video">
          {selectedStreamUrl ? (
            <iframe
              src={selectedStreamUrl}
              className="w-full h-full"
              frameBorder="0"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-secondary text-secondary-foreground">
              Select a source and stream to begin.
            </div>
          )}
        </CardContent>
      </Card>

      {/* --- Selections --- */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Source Selection */}
        <Card>
          <CardHeader>
            <CardTitle>1. Select a Source</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {match.sources.length > 0 ? (
              match.sources.map((s) => (
                <Button
                  key={s.source}
                  variant="outline"
                  onClick={() => handleSourceClick(s.source, s.id)}
                >
                  {s.source}
                </Button>
              ))
            ) : (
              <p>No sources available for this match.</p>
            )}
          </CardContent>
        </Card>

        {/* Stream Selection */}
        <Card>
          <CardHeader>
            <CardTitle>2. Select a Stream</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingStreams ? (
              <LoadingSpinner />
            ) : (
              <div className="flex flex-col gap-2">
                {streams.length > 0 ? (
                  streams.map((stream) => (
                    <Button
                      key={stream.id}
                      variant="ghost"
                      className="justify-start"
                      onClick={() => handleStreamClick(stream)}
                    >
                      {stream.language} {stream.hd && "(HD)"}
                      <a href={stream.embedUrl} target="_blank" className="ml-auto">
                       <ExternalLink className="ml-2" />
                       </a>
                    </Button>
                  ))
                ) : (
                  <p className="text-muted-foreground">
                    Select a source to see available streams.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
