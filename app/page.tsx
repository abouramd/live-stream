// app/page.tsx
import { Suspense } from "react";
import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";
import SearchInput from "@/components/SearchInput";
import LiveStream from "@/components/liveStreams";
import { Header } from "@/components/header";
import { SkeletonCardGrid, SkeletonHero } from "@/components/skeleton-loaders";

export const metadata = {
  title: "Watch Live - Live Sports Streaming | Home",
  description: "Watch live sports matches in real-time. Stream football, basketball, tennis, and more with multiple high-quality sources.",
  openGraph: {
    title: "Watch Live - Live Sports Streaming",
    description: "Watch live sports matches in real-time with multiple streaming sources.",
    url: "https://live-stream-snowy.vercel.app",
  },
};

async function MatchesContent({ query, live }: { query?: string; live?: boolean }) {
  const liveMatches = await getMatches(live ? "live" : "all-today");

  const filteredMatches = query
    ? liveMatches.filter((match) =>
        match.title.toLowerCase().includes(query.toLowerCase())
      )
    : liveMatches;

  return (
    <>
      {filteredMatches.length === 0 && (
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="text-lg text-muted-foreground mb-2">
              No live matches at the moment.
            </p>
            <p className="text-sm text-muted-foreground">
              Check back soon for upcoming matches!
            </p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 animate-in fade-in-50 duration-1000">
        {filteredMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </>
  );
}

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; live?: boolean }>;
}) {
  const { q: query, live } = await searchParams;
  const allMatches = await getMatches("all-today");
  const featuredMatch = allMatches[0]; // Use first match as featured

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="container p-4 mx-auto max-w-screen-2xl">

          {/* Filters Section */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <h2 className="text-2xl font-bold">Available Matches</h2>
              <SportSelector />
            </div>
            <div className="flex items-center justify-between gap-4 flex-col sm:flex-row">
              <SearchInput />
              {/* <LiveStream /> */}
            </div>
          </div>

          {/* Matches Grid */}
          <Suspense fallback={<SkeletonCardGrid />}>
            <MatchesContent query={query} live={live} />
          </Suspense>
        </div>
      </main>
    </>
  );
}