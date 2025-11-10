// app/page.tsx
import { getMatches } from "@/lib/api";
import { MatchCard } from "@/components/match-card";
import { SportSelector } from "@/components/sport-selector";
import SearchInput from "@/components/SearchInput";
import LiveStream from "@/components/liveStreams";

export default async function HomePage({ searchParams } : { searchParams: Promise<{ q?: string, live?: boolean}>}) {
  // Fetch live matches on the server
  const { q: query, live } = await searchParams;
  let liveMatches = await getMatches(live ? "live" : "all-today");

  // filter using query 
  if (query) {
    liveMatches = liveMatches.filter((match) =>
      match.title.toLowerCase().includes(query.toLowerCase())
    );
  }


  return (
    <main className="container p-4 mx-auto">
      <div className="mb-3 flex items-center justify-between">
        <h1 className="mb-3 text-3xl font-bold">Live Matches</h1>
        <SportSelector />
      </div>
      <div className="mb-3 flex items-center justify-between">
        <SearchInput />
        <LiveStream />
      </div>


      {liveMatches.length === 0 && (
        <p>No live matches at the moment.</p>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {liveMatches.map((match) => (
          <MatchCard key={match.id} match={match} />
        ))}
      </div>
    </main>
  );
}