// app/sports/[sportId]/page.tsx
import { Metadata } from "next";
import { Suspense } from "react";
import { getMatches, getSportById, getSports } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";
import { notFound } from "next/navigation";
import SearchInput from "@/components/SearchInput";
import { Header } from "@/components/header";
import { SkeletonCardGrid } from "@/components/skeleton-loaders";
import { Badge } from "@/components/ui/badge";

// Props definition
interface SportPageProps {
  params: Promise<{
    sportId: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export async function generateMetadata(
  { params }: SportPageProps
): Promise<Metadata> {
  const { sportId } = await params;
  const sportData = await getSportById(sportId);

  if (!sportData) {
    return {
      title: "Sport Not Found",
    };
  }

  return {
    title: `${sportData.name} Live Matches - Watch Live`,
    description: `Watch live ${sportData.name} matches in real-time. Multiple streaming sources available. Join thousands of fans streaming their favorite ${sportData.name} events.`,
    keywords: [sportData.name, "live", "streaming", "matches", "sports"],
    openGraph: {
      title: `${sportData.name} Matches - Watch Live`,
      description: `Watch live ${sportData.name} matches with multiple sources`,
      url: `https://watch-live.app/sports/${sportId}`,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${sportData.name} Matches - Watch Live`,
      description: `Watch live ${sportData.name} matches`,
    },
  };
}

async function SportMatches({ sportId, query }: { sportId: string; query?: string }) {
  let matches = await getMatches(sportId);

  if (query) {
    matches = matches.filter((match) =>
      match.title.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <>
      {matches.length === 0 && (
        <div className="flex items-center justify-center py-16">
          <div className="text-center max-w-md">
            <div className="mb-4 text-6xl">📺</div>
            <p className="text-xl font-semibold mb-2">No matches found</p>
            <p className="text-muted-foreground">
              {query
                ? `No matches matching "${query}" for this sport.`
                : "Check back soon for upcoming matches in this sport!"}
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-50 duration-1000">
        {matches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}

export default async function SportPage({ params, searchParams }: SportPageProps) {
  const { sportId } = await params;
  const { q: query } = await searchParams;

  const sportData = await getSportById(sportId);

  if (!sportData) {
    return notFound();
  }

  const matchCount = await getMatches(sportId);
  const liveCount = matchCount.filter((m) => m.popular).length;

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container p-4 mx-auto max-w-screen-2xl">
          {/* Sport Header */}
          <div className="mb-8 space-y-4">
            <div className="flex items-center gap-4 flex-wrap">
              <h1 className="text-4xl md:text-5xl font-bold">
                {sportData.name}
              </h1>
              <div className="flex gap-2">
                {liveCount > 0 && (
                  <Badge className="bg-red-500 hover:bg-red-600 animate-pulse h-fit">
                    🔴 {liveCount} LIVE
                  </Badge>
                )}
                <Badge variant="secondary" className="h-fit">
                  {matchCount.length} matches
                </Badge>
              </div>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl">
              Stream all the latest {sportData.name} matches with multiple sources. Watch in HD quality with instant switching between providers.
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <SearchInput />
            <SportSelector selectedSportId={sportId} />
          </div>

          {/* Matches Grid */}
          <Suspense fallback={<SkeletonCardGrid count={9} />}>
            <SportMatches sportId={sportId} query={query} />
          </Suspense>
        </div>
      </main>
    </>
  );
}

// Generate static params for all sports
export async function generateStaticParams() {
  const sports = await getSports();

  return sports.map((sport) => ({
    sportId: sport.id,
  }));
}
